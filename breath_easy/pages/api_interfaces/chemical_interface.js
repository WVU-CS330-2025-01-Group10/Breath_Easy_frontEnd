import axios from 'axios';

const API_URL = 'https://planetarycomputer.microsoft.com/api/stac/v1/search';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        // Define the bounding box for the query based on latitude and longitude
        const bbox = [parseFloat(longitude) - 0.1, parseFloat(latitude) - 0.1, parseFloat(longitude) + 0.1, parseFloat(latitude) + 0.1];
        
        const requestBody = {
            collections: ["sentinel-5p-l2-netcdf"],
            bbox: bbox,
            datetime: "2025-01-01T00:00:00Z/2025-12-31T23:59:59Z",
            limit: 5
        };

        const response = await axios.post(API_URL, requestBody, {
            headers: { 'Content-Type': 'application/json' }
        });

        const items = response.data.features;
        if (!items || items.length === 0) {
            return res.status(404).json({ error: 'No chemical concentration data available' });
        }

        // Extracting relevant pollutants from the first available dataset
        const pollutantData = items.map(item => ({
            timestamp: item.properties.datetime,
            pollutants: {
                co: item.assets.co?.href || 'N/A',
                no2: item.assets.no2?.href || 'N/A',
                so2: item.assets.so2?.href || 'N/A',
                o3: item.assets.o3?.href || 'N/A',
                ch4: item.assets.ch4?.href || 'N/A',
                hcho: item.assets.hcho?.href || 'N/A'
            }
        }));

        return res.status(200).json({ pollutantData });
    } catch (error) {
        console.error('Error fetching chemical data:', error);
        return res.status(500).json({ error: 'Failed to fetch chemical concentration data' });
    }
}