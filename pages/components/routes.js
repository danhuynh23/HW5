import React from "react";
import { geoPath, geoMercator } from "d3-geo";

function Routes(props) {
    const { projection, routes, selectedAirlineID } = props;

    // If no airline is selected, render an empty <g>
    if (!selectedAirlineID) {
        return <g></g>;
    }

    // Filter routes to only include those that match the selected airline
    const airlineRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);
    React.useEffect(() => {
        console.log("Rendering routes for Airline ID:", selectedAirlineID); // Log to verify selected airline
    }, [selectedAirlineID]);

    return (
        <g>
            {airlineRoutes.map((route, i) => {
                const [sourceX, sourceY] = projection([route.SourceLongitude, route.SourceLatitude]) || [null, null];
                const [destX, destY] = projection([route.DestLongitude, route.DestLatitude]) || [null, null];

                // Check if both source and destination coordinates are valid
                if (sourceX == null || sourceY == null || destX == null || destY == null) {
                    return null;
                }

                return (
                    <line
                        key={i}
                        x1={sourceX}
                        y1={sourceY}
                        x2={destX}
                        y2={destY}
                        stroke="#992a5b"
                        strokeWidth={0.5}
                        opacity={0.5}
                    />
                );
            })}
        </g>
    );
}

export { Routes }