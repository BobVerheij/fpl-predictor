import { LoadingOutlined } from "@ant-design/icons";
import { stat } from "fs";
import { max, range } from "lodash";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

import * as Styled from "./Graph.styled";

interface IGraph {
  data: { avg: string }[];
  playerName: string;
  photo?: string;
}

const Graph = ({ data, playerName, photo }: IGraph) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 1000);
  }, [data]);

  const average =
    [...data].reduce((acc, dat) => acc + parseInt(dat.avg), 0) / data.length;
  const max =
    Math.floor(
      parseInt(
        [...data].sort((a, b) => parseInt(b.avg) - parseInt(a.avg))[0]?.avg
      ) *
        10 *
        1.1
    ) / 10;
  const min =
    Math.floor(
      parseInt(
        [...data].sort((a, b) => parseInt(a.avg) - parseInt(b.avg))[0]?.avg
      ) *
        10 *
        0.9
    ) / 10;

  return (
    <>
      {data && (
        <Styled.GraphContainer photo={photo}>
          {isLoading && <LoadingOutlined></LoadingOutlined>}
          {!isLoading && (
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <LineChart
                data={data}
                margin={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
                <YAxis hide domain={[min, max]}></YAxis>
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="var(--secondary)"
                  style={{ mixBlendMode: "multiply" }}
                  strokeWidth={3}
                  dot={false}
                  connectNulls={true}
                  name={playerName}
                  isAnimationActive={true}
                ></Line>
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="var(--secondary)"
                  style={{ mixBlendMode: "overlay" }}
                  strokeWidth={3}
                  dot={false}
                  connectNulls={true}
                  name={playerName}
                  isAnimationActive={true}
                ></Line>

                <ReferenceLine
                  strokeDasharray="3 3"
                  y={average}
                  stroke="var(--primary)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Styled.GraphContainer>
      )}
    </>
  );
};

export default Graph;
