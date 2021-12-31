import { LoadingOutlined } from "@ant-design/icons";
import { stat } from "fs";
import { range } from "lodash";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useStore } from "../../../stores/ZustandStore";

import * as Styled from "./Graph.styled";

interface IGraph {
  data: { avg: string }[];
  playerName: string;
}

const Graph = ({ data, playerName }: IGraph) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const current = useStore((state) => state.current);

  const rangeOK = data.length < current;

  console.log(data.length, current, rangeOK);

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 1000);
  }, [data]);

  const average =
    data.reduce((acc, dat) => acc + parseInt(dat.avg), 0) / data.length;

  return (
    <>
      {data && rangeOK && (
        <Styled.GraphContainer>
          {isLoading && <LoadingOutlined></LoadingOutlined>}
          {!isLoading && (
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <LineChart
                data={data}
                margin={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
          )}
        </Styled.GraphContainer>
      )}
    </>
  );
};

export default Graph;
