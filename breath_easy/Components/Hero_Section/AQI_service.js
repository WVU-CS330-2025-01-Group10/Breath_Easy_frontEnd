
/*
This file is responsible for getting air quality information based on the user's location. Like the location service, it has:

A "real" service that would send the coordinates to your backend to fetch data from the AirNow API
A "mock" service that returns sample air quality data for testing
A function called getAirQualityService() that chooses the right service based on environment

This service returns data like the Air Quality Index (AQI), humidity percentage, pollutant levels, and
can include additional metrics like temperature or wind speed.
 */

const airQualityServiceInterface = {
    getAirQualityData: async (coordinates) => {
        // This would call the backend API from AirNow in production
        try {
            const response = await fetch('/api/air-quality', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coordinates })
            });

            if (!response.ok) throw new Error('Air quality service unavailable');
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch air quality data:", error);
            return {
                aqi: null,
                humidity: null,
                pollutantLevel: null,
                additionalMetrics: {}
            };
        }
    }
};

// Mock implementation for development
const mockAirQualityService = {
    getAirQualityData: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    aqi: 31,
                    humidity: 44,
                    pollutantLevel: "High",
                    additionalMetrics: {
                        temperature: 72,
                        windSpeed: 5,
                        pollen: "Medium"
                    }
                });
            }, 1500);
        });
    }
};

const getAirQualityService = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? airQualityServiceInterface : mockAirQualityService;
};

module.exports = { getAirQualityService };