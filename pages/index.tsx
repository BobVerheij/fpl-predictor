import { Bootstrap, fetchBootstrap, fetchLive } from "fpl-api";
import { useStore } from "../src/stores/ZustandStore";
import * as ball from "../public/animations/fpl-ball.json";
import FilterBar from "../src/components/filters/FilterBar";
import Lottie from "react-lottie-segments";
import NavBar from "../src/components/navigation/NavBar";
import Player from "../src/components/player/Player";
import React, { useEffect, useState } from "react";
import SortBar from "../src/components/filters/SortBar";
import Stat from "../src/components/stats/Stat";
import { NewBootstrap, NewElement } from "../src/types/Types";
import Slider from "../src/components/slider/Slider";

const GameWeekPage = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const current = useStore((state) => state.current);
  const setCurrent = useStore((state) => state.setCurrent);
  const [calcStart, setCalcStart] = useState<number>(1);

  const [sortStats, setSortStats] = useState<string[]>([, "total_points"]);

  const sort = useStore((state) => state.sort);

  const teams = useStore((state) => state.teams);
  const setTeams = useStore((state) => state.setTeams);
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);

  const liveDetails = useStore((state) => state.liveDetails);
  const setLiveDetails = useStore((state) => state.setLiveDetails);

  const [currentLoadingPercentage, setCurrentLoadingPercentage] =
    useState<number>(0);
  const positionFilter = useStore((state) => state.positionFilter);

  const loopOptions = {
    loop: true,
    autoplay: true,
    animationData: ball,
    width: 100,
    height: 100,
    rendererSettings: {
      className: "animation",
    },
  };

  const reloadBootstrap = async () => {
    const newBootstrap: any = await fetchBootstrap();
    setBootstrap(newBootstrap);
  };

  if (!bootstrap) {
    reloadBootstrap();
    if (teams === []) setTeams(bootstrap?.teams);
  }

  useEffect(() => {
    const reloadLiveDetails = async () => {
      setIsLoading(true);
      let newLiveDetails = [];
      for (let i = 1; i <= 38; i++) {
        newLiveDetails = [...newLiveDetails, await fetchLive(i)];
        setCurrentLoadingPercentage(Math.floor((i / 38) * 100));
      }
      setLiveDetails(newLiveDetails);
      setIsLoading(false);
    };
    reloadLiveDetails();
  }, []);

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

  const sortAscending = true;

  const resetAllPlayerHistory = () => {
    liveDetails.map((details, index) => {
      const highest = {
        ...highestOptions,
      };

      Object.keys(highestOptions).map((stat) => {
        highest[stat] = details.elements.sort(
          (a, b) => b.stats[stat] - a.stats[stat]
        )?.[0]?.stats[stat];
      });

      return details.elements.map((player) => {
        let currentPlayer = bootstrap.elements.find(
          (element) => element.id === player.id
        );
        if (!currentPlayer.sortStats)
          currentPlayer.sortStats = {
            a: 0,
            b: 0,
          };
        if (!currentPlayer.history) currentPlayer.history = [];
        currentPlayer.history[index] = {
          id: player.id,
          stats: player.stats,
          explain: player.explain,
          gameweek: index,
          highest: highest,
        };
      });
    });
  };

  const gameWeekChange = async (value: number) => {
    setCurrent(value);
    console.log("gameweek changed to " + value);
    resetAllPlayerHistory();
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

  useEffect(() => {
    if (sort.length < 2) {
      setSortStats([, ...sort]);
    } else {
      setSortStats([...sort].splice(0, 2));
    }
  }, [sort]);

  const calcRange = [calcStart, current];

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
      <NavBar gameWeekChange={gameWeekChange}></NavBar>

      {isLoading && (
        <Lottie
          style={{ width: "80vw", maxWidth: "400px", padding: "8px" }}
          height={200}
          options={loopOptions}
        />
      )}

      <FilterBar></FilterBar>
      <SortBar></SortBar>

      <Slider
        onChange={setCalcStart}
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

export default GameWeekPage;
{
  /* {bootstrap?.elements
          .filter(
            (element) =>
              liveDetails?.[current - 1]?.elements.find(
                (ldPlayer) =>
                  ldPlayer.id === element.id &&
                  ldPlayer.stats.total_points !== 0
              ) && positionFilter.includes(element.element_type)
          )
          .sort((a, b) => {
            const sortArray = [...sort].map(
              (s) =>
                parseInt(
                  liveDetails?.[current - 1]?.elements[b.id - 1]?.stats[s]
                ) -
                parseInt(
                  liveDetails?.[current - 1]?.elements[a.id - 1]?.stats[s]
                )
            );
            return sortArray.find((s) => s !== 0);
          })
          .slice(0, 20)
          .map((player, index) => (
            <Player
              key={player.id}
              imageSide={index % 2 === 0 ? "left" : "right"}
              reason={"Most Captained"}
              playerID={player.id}
              sizing={index + 1}
            ></Player>
          ))} */
}
