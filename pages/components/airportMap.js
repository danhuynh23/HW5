import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes';

function AirportMap(props) {
    const { width, height, countries, airports, routes, selectedAirlineID } = props;

    // Define the projection
    const projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // Define path generator
    const pathGenerator = geoPath().projection(projection);

    return (
        <g>
            {/* Draw the world map */}
            {countries.features.map((feature, i) => (
                <path
                    key={i}
                    d={pathGenerator(feature)}
                    stroke="#ccc"
                    fill="#eee"
                />
            ))}

            {/* Draw the airports */}
            {airports
                .filter(airport => airport.Latitude != null && airport.Longitude != null) // Filter valid coordinates
                .map((airport, i) => {
                    const [cx, cy] = projection([airport.Longitude, airport.Latitude]) || [null, null];

                    if (cx == null || cy == null) {
                        console.warn("Invalid projection for airport:", airport);
                        return null;
                    }

                    return (
                        <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={1}
                            fill="#2a5599"
                        />
                    );
                })}

            {/* Draw the routes for the selected airline */}
            <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID} />
        </g>
    );
}

export { AirportMap };
