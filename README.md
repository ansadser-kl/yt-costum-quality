# YouTube All Quality API (ansadkl)

A Node.js Express API wrapper that fetches all available YouTube video qualities (`best`, `144p`, `240p`, `360p`, `480p`, `720p`, `1080p`, `1440p`, `2160p`) in a single request.

## Installation & Local Testing (Termux)
1. Install Node.js: `pkg install nodejs`
2. Install dependencies: `npm install`
3. Run the server: `npm start`

## Deployment on Render
1. Push this project to a GitHub repository.
2. Create a new **Web Service** on Render, connecting your repository.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Your API will be live at: `https://your-app.onrender.com/api/ytv?url=YOUR_YOUTUBE_URL`
