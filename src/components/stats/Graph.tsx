import React from "react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const Graph = ({ data, playerName, calcRange }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        left: "0",
        right: "0",
      }}
    >
      <ResponsiveContainer width={"100%"} height={100}>
        <LineChart
          data={data}
          margin={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          <Tooltip
            itemStyle={{
              padding: "0.1em 0.5em",
            }}
            labelStyle={{
              color: "white",
              padding: "0.1em 0.5em",
            }}
            contentStyle={{
              backgroundColor: "var(--primary)",
              borderRadius: "0.5em",
              fontSize: "0.8rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="player"
            stroke="var(--secondary)"
            strokeWidth={3}
            dot={false}
            connectNulls={true}
            name={playerName}
            isAnimationActive={false}
          ></Line>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="best"
            stroke="#ffffff50"
            strokeWidth={3}
            name={"Highest"}
            dot={false}
          ></Line>
          {/* <XAxis
            hide
            type="number"
            dataKey="player"
            allowDataOverflow
            domain={[calcRange[0], calcRange[1]]}
          /> */}
          <ReferenceLine y={0} stroke="white" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
