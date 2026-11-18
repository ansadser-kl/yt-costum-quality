const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/api/ytv', async (req, res) => {
    try {
        const videoUrl = req.query.url;
        if (!videoUrl) {
            return res.status(400).json({ status: false, error: 'YouTube URL is required!' });
        }

        // All requested qualities
        const qualities = ['best', '144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p'];
        
        let videoMeta = null;
        const downloadLinks = {};

        const promises = qualities.map(async (q) => {
            try {
                const qualityParam = q === 'best' ? 'best' : q.replace('p', '');
                const apiUrl = `https://kiraxmd-api.onrender.com/api/ytv?url=${encodeURIComponent(videoUrl)}&quality=${qualityParam}`;
                
                const response = await axios.get(apiUrl, { timeout: 15000 });
                
                if (response.data && response.data.status && response.data.result) {
                    if (!videoMeta) {
                        videoMeta = {
                            title: response.data.result.title,
                            thumbnail: response.data.result.thumbnail,
                            duration: response.data.result.duration,
                            author: response.data.result.author,
                            format: response.data.result.format || "MP4"
                        };
                    }
                    if (response.data.result.download) {
                        downloadLinks[q] = response.data.result.download;
                    }
                }
            } catch (err) {
                // Skip qualities that are not available for this video
            }
        });

        await Promise.all(promises);

        if (!videoMeta) {
            return res.status(404).json({ status: false, error: 'Failed to fetch video details from API.' });
        }

        res.json({
            status: true,
            creator: "ansadkl",
            result: {
                ...videoMeta,
                qualities: downloadLinks
            }
        });

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.json({
        status: true,
        creator: "ansadkl",
        message: "YouTube All Quality API is running successfully!",
        endpoint: "/api/ytv?url=<youtube_url>"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Wrapper running on port ${PORT}`);
});
