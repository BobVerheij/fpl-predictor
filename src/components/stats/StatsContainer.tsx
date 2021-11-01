import React from "react";
import { NewElement } from "../../types/Types";

import Stat from "./Stat";

import { highestOptions } from "../../constants/HighestOptions";
import { useStore } from "../../stores/ZustandStore";
import StatColumn from "./StatColumn";

interface StatsContainerProps {
  element: NewElement;
  calcRange: number[];
}

const StatsContainer = ({ element, calcRange }) => {
  const current = useStore((state) => state.current);
  const calcStart = calcRange[0];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column",
        overflow: "scroll",
      }}
      key={element.id}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "row nowrap",
        }}
      >
        <p>{element.web_name}</p>
        <p>{Math.round(element.sortStats.a * 100) / 100}</p>
        {element.sortStats.b && (
          <>
            <p>{Math.round(element.sortStats.b * 100) / 100}</p>
            <p>
              {Math.round((element.sortStats.a / element.sortStats.b) * 100) /
                100}
            </p>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          overflow: "scroll",
          position: "relative",
        }}
      >
        <div
          style={{
            order: -1000,
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
            paddingLeft: "12px",
            color: "white",
            minWidth: "120px",
            background: "var(--primary)",
            boxShadow: "0 0 20px rgba(0, 0, 0, 1)",
          }}
        >
          <p
            style={{
              textTransform: "capitalize",
              padding: "0",
              margin: "0",
              fontSize: "0.8rem",
            }}
          >
            Gameweek
          </p>
          {Object.keys(highestOptions).map((key) => (
            <p
              style={{
                textTransform: "capitalize",
                padding: "0",
                margin: "0",
                fontSize: "0.8rem",
              }}
            >
              {key.split("_").join(" ")}
            </p>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            alignItems: "center",
            minWidth: `${
              element?.history?.find((history) => history?.id > 0).gameweek * 40
            }px`,
            background: "var(--primary)",
          }}
        ></div>

        {element?.history
          ?.filter((history) => history.gameweek < current)
          .map((history, index) =>
            history.stats.minutes ? (
              <StatColumn
                calcStart={calcStart}
                history={history}
                index={index}
                id={element.id}
              >
                <>
                  <Stat
                    statName="gameweek"
                    value={history.gameweek + 1}
                    highest=""
                  ></Stat>
                  {Object.keys(history?.stats).map((key) => (
                    <Stat
                      statName={key}
                      value={history.stats[key]}
                      highest={history.highest[key]}
                    ></Stat>
                  ))}
                </>
              </StatColumn>
            ) : (
              <div
                style={{
                  order: -(index + 1),
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  minWidth: "20px",
                  background: "var(--primary)",
                  borderTop:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                  borderBottom:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                  borderLeft:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                  borderRight:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                }}
              ></div>
            )
          )}
      </div>
    </div>
  );
};

export default StatsContainer;
