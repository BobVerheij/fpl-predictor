import React from "react";
import Slider from "../src/components/slider/Slider";
import { useStore } from "../src/stores/ZustandStore";
import { useState } from "react";
import { NewBootstrap, NewElement } from "../src/types/Types";
import * as ball from "../public/animations/fpl-ball.json";

import Stat from "../src/components/stats/Stat";
import SortBar from "../src/components/filters/SortBar";

import NavBar from "../src/components/navigation/NavBar";
import FilterBar from "../src/components/filters/FilterBar";

import { resetAllPlayerHistory } from "../src/services/resetAllPlayerHistory";
import LoadingAnimation from "../src/components/loading/LoadingAnimation";

const StatsPage = () => {
  const [calcStart, setCalcStart] = useState<number>(1);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const isLoading = useStore((state) => state.isLoading);

  const setCurrent = useStore((state) => state.setCurrent);

  const positionFilter = useStore((state) => state.positionFilter);
  const sort = useStore((state) => state.sort);

  const calcRange = [calcStart, current];

  const highestOptions = {
    minutes: null,
    goals_scored: null,
    assists: null,
    clean_sheets: null,
    goals_conceded: null,
    own_goals: null,
    penalties_saved: null,
    penalties_missed: null,
    yellow_cards: null,
    red_cards: null,
    saves: null,
    bonus: null,
    bps: null,
    influence: null,
    creativity: null,
    threat: null,
    ict_index: null,
    total_points: null,
    in_dreamteam: null,
  };

  const sortByAverages = (elements: NewElement[]) => {
    return elements
      ?.map((element) => ({
        ...element,
        sortStats: {
          a:
            element.history?.reduce(
              (acc, history) =>
                (acc +=
                  history.gameweek >= calcRange[0] - 1 &&
                  parseInt(history.stats[sort[0]]) | history.stats[sort[0]]),
              0
            ) /
            (calcRange[1] - (calcRange[0] - 1)),
          b:
            sort[1] &&
            element.history?.reduce(
              (acc, history) =>
                (acc +=
                  history.gameweek >= calcRange[0] - 1 &&
                  parseInt(history.stats[sort[1]]) | history.stats[sort[1]]),
              0
            ) /
              (calcRange[1] - (calcRange[0] - 1)),
        },
      }))
      ?.filter(
        (element) =>
          element.sortStats.a !== 0 && (sort[1] && element.sortStats.b) !== 0
      )
      .sort((a, b) => {
        if (b.sortStats.b && a.sortStats.b) {
          return b.sortStats.a / b.sortStats.b - a.sortStats.a / a.sortStats.b;
        }
        return b.sortStats.a - a.sortStats.a;
      });
  };

  const filteredElements = (
    bootstrap: NewBootstrap,
    offset?: number,
    limit?: number
  ) => {
    return sortByAverages(
      bootstrap?.elements?.filter((element) =>
        positionFilter.includes(element.element_type)
      )
    )?.slice(offset | 0, limit | 20);
  };

  return (
    <>
      <NavBar />
      {isLoading && <LoadingAnimation />}
      <FilterBar></FilterBar>
      <SortBar></SortBar>

      <Slider
        onBlur={setCalcStart}
        current={current}
        calcStart={calcStart}
      ></Slider>

      <div
        style={{
          margin: "0 auto",
          maxWidth: "400px",
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {filteredElements(bootstrap)?.map((element: NewElement) => (
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
                    {Math.round(
                      (element.sortStats.a / element.sortStats.b) * 100
                    ) / 100}
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
                    element?.history?.find((history) => history?.id > 0)
                      .gameweek * 40
                  }px`,
                  background: "var(--primary)",
                }}
              ></div>

              {element?.history
                ?.filter((history) => history.gameweek < current)
                .map((history, index) =>
                  history.stats.minutes ? (
                    <div
                      style={{
                        order: -(index + 1),
                        display: "flex",
                        flexFlow: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        opacity:
                          !(
                            history.gameweek <= current - 1 &&
                            history.gameweek >= calcStart - 1
                          ) && 0.2,
                        border: "1px solid var(--primary)",
                        borderTop:
                          history.gameweek <= current - 1 &&
                          history.gameweek >= calcStart - 1
                            ? "2px solid var(--primary)"
                            : "",
                        borderBottom:
                          history.gameweek <= current - 1 &&
                          history.gameweek >= calcStart - 1
                            ? "2px solid var(--primary)"
                            : "",
                        borderRight:
                          history.gameweek === calcStart - 1
                            ? "2px solid var(--primary)"
                            : "",
                        borderLeft:
                          history.gameweek === current - 1
                            ? "2px solid var(--primary)"
                            : "",
                        background:
                          history.gameweek % 2 === 0
                            ? "rgba(255, 105, 180, .3)"
                            : "white",
                      }}
                      key={element.id + "_" + history.gameweek}
                    >
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
                    </div>
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
        ))}
      </div>
    </>
  );
};

export default StatsPage;
