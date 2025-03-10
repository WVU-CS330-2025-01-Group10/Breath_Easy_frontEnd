import axios from 'axios';

const API_KEY = process.env.AIRNOW_API_KEY;
const API_URL = 'https://www.airnowapi.org/aq/observation/latLong/current/';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await axios.get(API_URL, {
            params: { format: 'application/json', latitude, longitude, distance: 25, API_KEY },
        });

        const data = response.data;
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No AQI data available' });
        }

        return res.status(200).json({ aqi: data[0].AQI });
    } catch (error) {
        console.error('Error fetching AQI:', error);
        return res.status(500).json({ error: 'Failed to fetch AQI data' });
    }
}
