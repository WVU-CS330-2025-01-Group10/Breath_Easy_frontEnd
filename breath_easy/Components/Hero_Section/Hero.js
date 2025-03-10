/*
This is the main component that brings everything together. It:

Manages the application state (loading states and data)
Fetches location data when the component loads
Uses the location to fetch air quality data
Handles any errors in the data fetching process
Creates the layout for the entire section
Includes the heading, description, location display, and metrics
Passes the appropriate data to each child component

 */
const React = require("react");
const { useState, useEffect } = require("react");
const { getLocationService } = require("./Location_service");
const { getAirQualityService } = require("./AQI_service");
const { LocationDisplay } = require("./LocationDisplay");
const { MetricsContainer } = require("./MetricsContainer");

const Hero = () => {
    const [location, setLocation] = useState({
        city: "Loading...",
        state: "",
        coordinates: null
    });
    const [airQualityData, setAirQualityData] = useState({
        aqi: null,
        humidity: null,
        pollutantLevel: null,
        additionalMetrics: {}
    });
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [isLoadingAirQuality, setIsLoadingAirQuality] = useState(true);

    // Get service implementations
    const locationService = getLocationService();
    const airQualityService = getAirQualityService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch location data
                setIsLoadingLocation(true);
                const userLocation = await locationService.getCurrentLocation();
                setLocation(userLocation);
                setIsLoadingLocation(false);

                // After getting location, fetch air quality data
                setIsLoadingAirQuality(true);
                const airData = await airQualityService.getAirQualityData(userLocation.coordinates);
                setAirQualityData(airData);
            } catch (error) {
                console.error("Error in data fetching chain:", error);
            } finally {
                setIsLoadingLocation(false);
                setIsLoadingAirQuality(false);
            }
        };

        fetchData();
    }, []);

    return (
        React.createElement("section", { className: "relative py-24 overflow-hidden" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "max-w-3xl mx-auto text-center" },
                    React.createElement("h1", { className: "text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent" },
                        "Understand Asthma Risks in Your Location"
                    ),
                    React.createElement("p", { className: "text-lg text-muted-foreground mb-10" },
                        "Get personalized insights about asthma triggers and air quality in your area to better manage your respiratory health."
                    ),

                    // Location component
                    React.createElement(LocationDisplay, {
                        location: location,
                        isLoading: isLoadingLocation
                    }),

                    // Metrics component
                    React.createElement(MetricsContainer, {
                        airQualityData: airQualityData,
                        isLoading: isLoadingAirQuality
                    })
                )
            )
        )
    );
};

module.exports = { Hero };