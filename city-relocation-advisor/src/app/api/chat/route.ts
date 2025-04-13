import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Groq } from 'groq-sdk';
import { 
  canMakeRequest, 
  registerRequest, 
  handleRateLimitError, 
  getWaitTime,
  extractRetryDelay
} from '@/utils/rate-limiter';

// Initialize Groq client
let groq: Groq | null = null;
try {
  if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️ GROQ_API_KEY is not set. Groq features will be disabled.');
  } else {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }
} catch (error) {
  console.error('❌ Error initializing Groq client:', error);
}

// Initialize other API keys
const RADAR_API_KEY = process.env.RADAR_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const JINA_API_KEY = process.env.JINA_API_KEY;

// Add timeout to axios requests
const axiosWithTimeout = (timeout: number = 5000) => {
  return axios.create({
    timeout: timeout,
  });
};

// Handle OPTIONS requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // Basic test response first
    const testResponse = new NextResponse(
      JSON.stringify({ status: 'API is working' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
    
    return testResponse;

    // Comment out the streaming response for now
    /*
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    ... rest of your existing code ...
    */
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

// Helper function to get location data from Radar API
async function getLocationData(currentLocation: string, desiredLocation: string) {
  try {
    const axios = axiosWithTimeout(5000);
    const [currentData, desiredData] = await Promise.all([
      axios.get(`https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(currentLocation)}`, {
        headers: { 'Authorization': RADAR_API_KEY }
      }),
      axios.get(`https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(desiredLocation)}`, {
        headers: { 'Authorization': RADAR_API_KEY }
      })
    ]);
    
    return {
      current: currentData.data,
      desired: desiredData.data
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}

// Helper function to get web search results from Serper API
async function getWebSearchResults(currentLocation: string, desiredLocation: string) {
  try {
    const axios = axiosWithTimeout(5000);
    const [currentResults, desiredResults] = await Promise.all([
      axios.post('https://google.serper.dev/search', {
        q: `${currentLocation} city living cost housing job market`,
        num: 5
      }, {
        headers: { 'X-API-KEY': SERPER_API_KEY }
      }),
      axios.post('https://google.serper.dev/search', {
        q: `${desiredLocation} city living cost housing job market`,
        num: 5
      }, {
        headers: { 'X-API-KEY': SERPER_API_KEY }
      })
    ]);

    return {
      current: currentResults.data,
      desired: desiredResults.data
    };
  } catch (error) {
    console.error('Error fetching web search results:', error);
    return null;
  }
}

// Helper function to get news from News API
async function getCityNews(currentLocation: string, desiredLocation: string) {
  try {
    const axios = axiosWithTimeout(5000);
    const [currentNews, desiredNews] = await Promise.all([
      axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(currentLocation)}&sortBy=relevancy&pageSize=5`, {
        headers: { 'X-Api-Key': NEWS_API_KEY }
      }),
      axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(desiredLocation)}&sortBy=relevancy&pageSize=5`, {
        headers: { 'X-Api-Key': NEWS_API_KEY }
      })
    ]);

    // Add source URL to each article
    const processArticles = (articles: any[]) => articles.map(article => ({
      ...article,
      source: article.url || 'https://newsapi.org'
    }));

    return {
      current: processArticles(currentNews.data.articles),
      desired: processArticles(desiredNews.data.articles)
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

// Helper function to get content summaries from Jina AI
async function getContentSummaries(currentLocation: string, desiredLocation: string) {
  try {
    const axios = axiosWithTimeout(8000); // Slightly longer timeout for content processing
    const formatLocation = (loc: string) => encodeURIComponent(loc.toLowerCase().trim());
    
    const [currentSummary, desiredSummary] = await Promise.all([
      getSummaryForCity(getUrlsForCity(currentLocation)),
      getSummaryForCity(getUrlsForCity(desiredLocation))
    ]);

    return {
      current: currentSummary,
      desired: desiredSummary
    };
  } catch (error) {
    console.error('Error getting content summaries:', error);
    return null;
  }
}

// Helper function to define multiple URL sources for each city
const getUrlsForCity = (city: string) => [
  `https://www.bestplaces.net/city/${city}`,
  `https://www.areavibes.com/${city}`,
  `https://www.city-data.com/city/${city}.html`,
  `https://www.niche.com/places-to-live/${city}`,
  `https://www.neighborhoodscout.com/${city}`,
  `https://www.realtor.com/local/${city}`,
  `https://www.zillow.com/${city}`,
  `https://www.trulia.com/city/${city}`,
  `https://www.walkscore.com/${city}`,
  `https://www.greatschools.org/search/search.page?q=${city}`,
  `https://www.numbeo.com/cost-of-living/in/${city}`,
  `https://www.payscale.com/cost-of-living-calculator/${city}`,
  `https://www.apartments.com/${city}`,
];

// Helper function to get summary for a city using multiple URLs
async function getSummaryForCity(urls: string[]) {
  for (const url of urls) {
    try {
      const response = await axios.post('https://api.jina.ai/v1/reader', {
        url,
        mode: 'summarize'
      }, {
        headers: { 'Authorization': `Bearer ${JINA_API_KEY}` }
      });
      
      if (response.data && response.data.summary) {
        return {
          ...response.data,
          source: url,
          success: true
        };
      }
    } catch (error: any) {
      console.warn(`Warning: Failed to get summary for ${url}:`, error?.message || 'Unknown error');
      continue; // Try next URL
    }
  }
  
  // If all URLs fail, return null summary
  return {
    summary: null,
    source: urls[0],
    success: false
  };
}