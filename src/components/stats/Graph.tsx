import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface IGraph {
  data: { avg: string }[];
  playerName: string;
}

const Graph = ({ data, playerName }: IGraph) => {
  const average =
    data.reduce((acc, dat) => acc + parseInt(dat.avg), 0) / data.length;
  console.log(average);
  return (
    <>
      {data && (
        <div style={{ width: "100%", height: "150px" }}>
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart
              data={data}
              margin={{ top: 8, bottom: 8, left: 0, right: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
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
                dataKey="avg"
                stroke="var(--secondary)"
                strokeWidth={3}
                dot={false}
                connectNulls={true}
                name={playerName}
                isAnimationActive={false}
              ></Line>
              <ReferenceLine y={average} stroke="var(--primary)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Graph;
