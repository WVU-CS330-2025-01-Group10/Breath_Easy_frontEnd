
/*
This component shows the user's current location in a nice pill-shaped badge with a map pin icon. It:

Displays the city and state (like "Morgantown, WV")
Shows a "Detecting location..." message with an animation while loading
Uses the MapPin icon from the Lucide library
 */

const React = require("react");
const { MapPin } = require("lucide-react");

const LocationDisplay = ({ location, isLoading }) => {
    return React.createElement("div", {
            className: `inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border mb-12 ${isLoading ? "animate-pulse" : ""}`
        },
        React.createElement(MapPin, { className: "w-5 h-5 text-blue-500" }),
        React.createElement("span", { className: "font-medium" },
            isLoading ? "Detecting location..." : `${location.city}, ${location.state}`
        )
    );
};

module.exports = { LocationDisplay };