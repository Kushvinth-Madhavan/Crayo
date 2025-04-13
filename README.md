# 🏙️ CityMate – AI City Relocation Advisor

<div align="center">

![CityMate Demo](https://raw.githubusercontent.com/yourusername/city-relocation-advisor/main/public/demo.gif)

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)](https://groq.com/)

</div>

---

## ✨ Features

<div align="center">
<img src="https://raw.githubusercontent.com/yourusername/city-relocation-advisor/main/public/features.gif" width="600px" />
</div>

- 🤖 **AI-Powered Analysis** – Advanced city comparison using Groq AI  
- 🌐 **Real-Time Data** – Live information from reliable sources  
- 📊 **Comprehensive Insights** – Analyze:
  - Cost of living
  - Housing trends
  - Job market
  - Quality of life
  - Neighborhoods
- 🎯 **Personalized Recommendations** – Tailored suggestions based on your preferences  
- ⚡ **Parallel API Processing** – Fast, concurrent data retrieval  
- 📱 **Modern UI/UX** – Smooth, responsive, and visually appealing interface  

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/city-relocation-advisor.git

# Install dependencies
cd city-relocation-advisor
npm install

# Set up environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following keys:

```env
GROQ_API_KEY=your_groq_api_key
SERPER_API_KEY=your_serper_api_key
NEWS_API_KEY=your_news_api_key
JINA_API_KEY=your_jina_api_key
RADAR_API_KEY=your_radar_api_key
```

---

## 🛠️ Tech Stack

<div align="center">

### 🌐 Frontend
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### ⚙️ Backend & AI
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-FF6B6B?style=for-the-badge)

### 🔗 APIs Used
- 🗺️ [Radar API](https://radar.io/)
- 🔍 [Serper API](https://serper.dev/)
- 📰 [News API](https://newsapi.org/)
- 📚 [Jina AI Reader](https://jina.ai/)

</div>

---

## 🎯 Feature Showcase

### 📍 Smart City Analysis
<div align="center">
<img src="https://raw.githubusercontent.com/yourusername/city-relocation-advisor/main/public/analysis.gif" width="600px" />
</div>

### 🌍 Real-Time Data Integration
<div align="center">
<img src="https://raw.githubusercontent.com/yourusername/city-relocation-advisor/main/public/realtime.gif" width="600px" />
</div>

### ⏳ Beautiful Loading Animations
<div align="center">
<img src="https://raw.githubusercontent.com/yourusername/city-relocation-advisor/main/public/loading.gif" width="600px" />
</div>

---

## 📊 API Usage Report

CityMate combines data from multiple sources with efficient parallel API calls:

```ts
const apiCalls = [
  getLocationData(),        // Radar API
  getWebSearchResults(),    // Serper API
  getCityNews(),            // News API
  getContentSummaries()     // Jina AI
];
```

Each call includes usage reporting and data reliability indicators:

<div align="center">
<img src="https://raw.githubusercontent.com/yourusername/city-relocation-advisor/main/public/api-report.png" width="400px" />
</div>

---

## 🌟 Why CityMate?

1. **Parallel API Processing**  
   - Concurrent calls to minimize latency  
   - Fallback systems ensure robustness  

2. **Smart Data Sources**  
   - Over 13 real-time, reliable data feeds  
   - Rich and up-to-date city information  

3. **Delightful UX**  
   - Smooth animations  
   - Clean, responsive layout  
   - Intuitive for all users  

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

We welcome contributions!  
Feel free to open an issue or submit a pull request to improve CityMate.

---

## 🙏 Acknowledgments

- [Groq AI](https://groq.com/) – blazing-fast inference  
- [Vercel](https://vercel.com/) – deployment made easy  
- All the amazing API providers powering CityMate  

---

<div align="center">
Made with ❤️ by [Kushvinth](https://github.com/yourusername)
</div>
