/*
This component organizes and manages all the metric cards. It:

Takes the air quality data and formats it for display
Determines the status text and colors for each metric based on its value
Creates a grid layout to hold all the metric cards
Can automatically add new metrics (like temperature) if they're available in the data
Passes the loading state to all cards so they animate together
 */

const React = require("react");
const { MetricCard } = require("./MetricCard");

const MetricsContainer = ({ airQualityData, isLoading }) => {
    // Define metrics cards data
    const metricsCards = [
        {
            title: "AQI",
            value: airQualityData.aqi,
            status: airQualityData.aqi < 50 ? "Good" : airQualityData.aqi < 100 ? "Moderate" : "Unhealthy",
            statusColor: airQualityData.aqi < 50 ? "green" : airQualityData.aqi < 100 ? "yellow" : "red"
        },
        {
            title: "Humidity",
            value: airQualityData.humidity ? `${airQualityData.humidity}%` : null,
            status: airQualityData.humidity < 30 ? "Low" : airQualityData.humidity > 60 ? "High" : "Average",
            statusColor: airQualityData.humidity < 30 ? "red" : airQualityData.humidity > 60 ? "blue" : "green"
        },
        {
            title: "Pollutant Count",
            value: airQualityData.pollutantLevel,
            status: airQualityData.pollutantLevel === "Low" ? "Good" :
                airQualityData.pollutantLevel === "Medium" ? "Moderate" : "Caution",
            statusColor: airQualityData.pollutantLevel === "Low" ? "green" :
                airQualityData.pollutantLevel === "Medium" ? "yellow" : "red"
        }
    ];

    // Example of how we could extend this with additional metrics
    if (airQualityData.additionalMetrics && airQualityData.additionalMetrics.temperature) {
        metricsCards.push({
            title: "Temperature",
            value: `${airQualityData.additionalMetrics.temperature}°F`,
            status: "Normal",
            statusColor: "blue"
        });
    }

    return React.createElement("div", { className: "grid md:grid-cols-3 gap-6" },
        metricsCards.map((card, index) =>
            React.createElement(MetricCard, {
                key: index,
                title: card.title,
                value: card.value,
                status: card.status,
                statusColor: card.statusColor,
                isLoading: isLoading
            })
        )
    );
};

module.exports = { MetricsContainer };