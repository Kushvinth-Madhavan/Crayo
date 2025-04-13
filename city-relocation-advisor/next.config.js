/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    // Explicitly expose all required environment variables
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    RADAR_API_KEY: process.env.RADAR_API_KEY,
    SERPER_API_KEY: process.env.SERPER_API_KEY,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    JINA_API_KEY: process.env.JINA_API_KEY
  },
  // Enable experimental features for App Router
  experimental: {
    serverActions: true,
    appDir: true
  },
  // Prevent server-only env variables from being exposed to the client
  serverRuntimeConfig: {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  // Ensure publicRuntimeConfig includes any variables needed on the client 
  publicRuntimeConfig: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
  },
  // Add trailing slashes to ensure consistent routing
  trailingSlash: true,
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Configure powered by header
  poweredByHeader: false
};

module.exports = nextConfig; 