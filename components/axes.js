import React from "react";

export { XAxis, YAxis };

function YAxis(props) {
    const { yScale, height, offsetX, axisLabel } = props;

    return (
        <g transform={`translate(${offsetX}, 0)`}>
            {/* Draw the y-axis line */}
            <line x1={0} x2={0} y1={0} y2={height} stroke="black" />

            {/* Draw the ticks and labels */}
            {yScale.domain().map((tickValue, index) => (
                <g key={index} transform={`translate(0, ${yScale(tickValue) + yScale.bandwidth() / 2})`}>
                    {/* Tick line */}
                    <line x1={-5} x2={0} stroke="black" />
                    {/* Flush left-aligned tick text inside the bounding box */}
                    <text
                        style={{ textAnchor: 'start', fontSize: '10px', fill: 'black', fontFamily: '"Times New Roman", Georgia, serif' }}
                        x={-offsetX - 130}
                        y={0}
                    >
                        {tickValue}
                    </text>
                </g>
            ))}

            {/* Axis label */}
            <text
                x={-offsetX + 20}
                y={-10}
                style={{ textAnchor: 'start', fontSize: '12px', fill: 'black', fontFamily: '"Times New Roman", Georgia, serif' }}
                transform="rotate(-90)"
            >
                {axisLabel}
            </text>
        </g>
    );
}

function XAxis(props) {
    const { xScale, width, height } = props;

    return (
        <g transform={`translate(0, ${height})`}>
            {/* Draw the x-axis line */}
            <line x1={0} x2={width} stroke="black" />
            {xScale.ticks(5).map(tickValue => (
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                    {/* Tick line */}
                    <line y2={10} stroke="black" />
                    {/* Tick text centered below the tick line */}
                    <text style={{ textAnchor: 'middle', fontSize: '10px' }} x={0} y={20}>
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}
