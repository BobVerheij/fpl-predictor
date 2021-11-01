import React, { ReactElement } from "react";
import { useStore } from "../../stores/ZustandStore";
import { NewStats } from "../../types/Types";

interface StatColumnProps {
  calcStart: number;
  children: ReactElement;
  index: number;
  history: NewStats;
  id: number;
}

const StatColumn = ({
  calcStart,
  children,
  index,
  history,
  id,
}: StatColumnProps) => {
  const current = useStore((state) => state.current);

  return (
    <div
      style={{
        order: -(index + 1),
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-around",
        alignItems: "center",
        opacity:
          !(
            history.gameweek <= current - 1 && history.gameweek >= calcStart - 1
          ) && 0.2,
        border: "1px solid var(--primary)",
        borderTop:
          history.gameweek <= current - 1 && history.gameweek >= calcStart - 1
            ? "2px solid var(--primary)"
            : "",
        borderBottom:
          history.gameweek <= current - 1 && history.gameweek >= calcStart - 1
            ? "2px solid var(--primary)"
            : "",
        borderRight:
          history.gameweek === calcStart - 1 ? "2px solid var(--primary)" : "",
        borderLeft:
          history.gameweek === current - 1 ? "2px solid var(--primary)" : "",
        background:
          history.gameweek % 2 === 0 ? "rgba(255, 105, 180, .3)" : "white",
      }}
      key={id + "_" + history.gameweek}
    >
      {children}
    </div>
  );
};

export default StatColumn;
