/*
This is a reusable display component that shows a single piece of air quality information. Each card has:

A title (like "AQI" or "Humidity")
A value (the actual measurement)
A status (like "Good" or "Moderate")
A color coding (green for good, yellow for moderate, red for bad)
A loading state (shows a pulsing animation while data is loading)

This component is designed to be flexible so you can use it to display any type of metric by just changing the data you pass to it.
 */

const React = require("react");
const { Card, CardContent } = require("../../components/ui/card");
const { Badge } = require("../../components/ui/badge");

const MetricCard = ({ title, value, status, statusColor, isLoading }) => {
    return React.createElement(Card, { className: "bg-background/80 backdrop-blur-sm border" },
        React.createElement(CardContent, { className: "pt-6" },
            React.createElement("div", {
                className: `text-4xl font-bold text-blue-500 mb-2 ${isLoading ? "animate-pulse" : ""}`
            }, isLoading ? "..." : value),
            React.createElement("div", { className: "text-sm text-muted-foreground mb-2" }, title),
            React.createElement(Badge, {
                variant: "secondary",
                className: `bg-${statusColor}-100 text-${statusColor}-700`
            }, isLoading ? "Loading..." : status)
        )
    );
};

module.exports = { MetricCard };