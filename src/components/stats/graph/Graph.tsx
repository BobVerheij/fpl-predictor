import { LoadingOutlined } from "@ant-design/icons";
import { stat } from "fs";
import { max, range } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import * as Styled from "./Graph.styled";

interface IGraph {
  data: { avg: string; weekly: string }[];
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

  const max =
    Math.floor(
      parseInt(
        [...data].sort((a, b) => parseInt(b.weekly) - parseInt(a.weekly))[0]
          ?.weekly
      ) *
        10 *
        1.1
    ) / 10;

  const min =
    Math.floor(
      parseInt(
        [...data].sort((a, b) => parseInt(a.weekly) - parseInt(b.weekly))[0]
          ?.weekly
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
              <ComposedChart
                data={data}
                margin={{ top: 8, bottom: 0, left: 8, right: 8 }}
              >
                <YAxis hide domain={[min, max]}></YAxis>
                {/* <XAxis hide domain={[range[0] - 1, range[1] - 1]}></XAxis> */}

                <Tooltip
                  trigger="hover"
                  itemStyle={{
                    color: "white",
                    padding: "0.1em 0.5em",
                  }}
                  labelStyle={{
                    padding: "0.1em 0.5em",
                    color: "white",
                    // display: "none",
                  }}
                  contentStyle={{
                    backgroundColor: "var(--primary)",
                    borderRadius: "0.5em",
                    fontSize: "0.8rem",
                  }}
                />

                <Bar
                  type="monotone"
                  dataKey="weekly"
                  fill="rgba(0, 0, 0, 0.3)"
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                  strokeWidth={1}
                  name={"Weekly"}
                  isAnimationActive={true}
                ></Bar>

                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="var(--secondary)"
                  style={{ zIndex: -1 }}
                  strokeWidth={3}
                  dot={false}
                  connectNulls={true}
                  name={"Average"}
                  isAnimationActive={true}
                ></Line>
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </Styled.GraphContainer>
      )}
    </>
  );
};

export default Graph;
