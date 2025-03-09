
/*
This file handles everything related to getting the user's location. It has two parts:

A "real" service that would actually call your backend API to get the user's location
A "mock" service that returns fake location data for testing or development
A function called getLocationService() that decides which one to use based on whether you're in production or not

The location service returns information like the city name, state, and precise coordinates
(latitude and longitude). If there's an error with the location service, it returns a
friendly message instead of crashing.

I will add more logic here later
*/

const locationServiceInterface = {
    getCurrentLocation: async () => {
        // this is going to call a backend function
        try {
            const response = await fetch('/api/location');
            if (!response.ok) throw new Error('Location service unavailable');
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch location:", error);
            return {
                city: "Location unavailable",
                state: "",
                coordinates: null
            };
        }
    }
};

// Mock implementation for development
const mockLocationService = {
    getCurrentLocation: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    city: "Morgantown",
                    state: "WV",
                    coordinates: {
                        latitude: 39.6295,
                        longitude: -79.9559
                    }
                });
            }, 1000);
        });
    }
};

const getLocationService = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? locationServiceInterface : mockLocationService;
};

module.exports = { getLocationService };