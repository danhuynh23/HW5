import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedAirlineID, setSelectedAirlineID } = props;

    // Find the maximum count of routes for x-axis scaling
    const maxCount = max(data, d => d.Count);

    // Define yScale using airline names
    const yScale = scaleBand()
        .domain(data.map(d => d.AirlineName)) // Use AirlineName instead of AirlineID
        .range([0, height])
        .padding(0.2);

    // Define xScale based on the maximum count
    const xScale = scaleLinear()
        .domain([0, maxCount])
        .range([0, width]);

    // Define color and event handlers
    const color = d => (d.AirlineID === selectedAirlineID ? "#992a5b" : "#2a5599");
    const onMouseOver = d => setSelectedAirlineID(d.AirlineID);
    const onMouseOut = () => setSelectedAirlineID(null);

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* Bars */}
            {data.map(d => (
                <rect
                    key={d.AirlineID}
                    x={0}
                    y={yScale(d.AirlineName)} // Use AirlineName for positioning
                    width={xScale(d.Count)}
                    height={yScale.bandwidth()}
                    fill={color(d)}
                    onMouseOver={() => onMouseOver(d)}
                    onMouseOut={onMouseOut}
                />
            ))}
            {/* X and Y Axes */}
            <XAxis xScale={xScale} width={width} height={height} />
            <YAxis yScale={yScale} height={height} offsetX={0} axisLabel="Airlines" />
        </g>
    );
}
