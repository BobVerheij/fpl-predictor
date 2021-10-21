import { fetchBootstrap, fetchLive } from "fpl-api";
import Player from "../src/components/player/Player";
import Lottie from "react-lottie-segments";
import * as ball from "../public/animations/fpl-ball.json";

import React, { useEffect, useState } from "react";

import { useStore } from "../src/stores/ZustandStore";

import NavBar from "../src/components/navigation/NavBar";
import FilterBar from "../src/components/filters/FilterBar";
import SortBar from "../src/components/filters/SortBar";
import { element } from "prop-types";

const GameWeekPage = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const current = useStore((state) => state.current);
  const setCurrent = useStore((state) => state.setCurrent);

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

  const resetAllPlayerHistory = () => {
    liveDetails.map((details, index) =>
      details.elements.map((player) => {
        let currentPlayer = bootstrap.elements.find(
          (element) => element.id === player.id
        );
        if (!currentPlayer.history) currentPlayer.history = [];
        currentPlayer.history[index] = {
          id: player.id,
          stats: player.stats,
          explain: player.explain,
          gameweek: index,
        };
      })
    );
  };

  const gameWeekChange = async (value: number) => {
    setCurrent(value);
    console.log("gameweek changed to " + value);
    resetAllPlayerHistory();
  };

  useEffect(() => {
    if (sort.length < 2) {
      setSortStats([, ...sort]);
    } else {
      setSortStats([...sort].splice(0, 2));
    }
  }, [sort]);

  const calcLength = 4;

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

      <div
        style={{
          margin: "0 auto",
          maxWidth: "400px",
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {bootstrap?.elements
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
          ))}

        <p>{`From GW ${current - calcLength} to GW ${current}`}</p>

        {bootstrap?.elements
          ?.filter((element) => positionFilter.includes(element.element_type))
          .sort(
            (a, b) =>
              b.history
                ?.filter((history) => history.gameweek >= current - calcLength)
                .reduce((acc, history) => {
                  return (
                    acc +
                    (typeof history.stats[sortStats[1]] === "string"
                      ? Math.floor(parseInt(history.stats[sortStats[1]]))
                      : history.stats[sortStats[1]])
                  );
                }, 0) -
              a.history
                ?.filter((history) => history.gameweek >= current - calcLength)
                .reduce((acc, history) => {
                  return (
                    acc +
                    (typeof history.stats[sortStats[1]] === "string"
                      ? Math.floor(parseInt(history.stats[sortStats[1]]))
                      : history.stats[sortStats[1]])
                  );
                }, 0)
          )
          .sort(
            (a, b) =>
              sortStats[0] !== null &&
              b.history
                ?.filter((history) => history.gameweek > current - calcLength)
                .reduce((acc, history) => {
                  return (
                    acc +
                    (typeof history.stats[sortStats[0]] === "string"
                      ? Math.floor(parseInt(history.stats[sortStats[0]]))
                      : history.stats[sortStats[0]])
                  );
                }, 0) -
                a.history
                  ?.filter((history) => history.gameweek > current - calcLength)
                  .reduce((acc, history) => {
                    return (
                      acc +
                      (typeof history.stats[sortStats[0]] === "string"
                        ? Math.floor(parseInt(history.stats[sortStats[0]]))
                        : history.stats[sortStats[0]])
                    );
                  }, 0)
          )
          .slice(0, 20)
          .map((element) => (
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
                {sortStats[0] && (
                  <p>
                    {sortStats[0].split("_").join(" ")}{" "}
                    {element.history
                      ?.filter(
                        (history) => history.gameweek >= current - calcLength
                      )
                      .reduce((acc, history) => {
                        return (
                          acc +
                          (typeof history.stats[sortStats[0]] === "string"
                            ? parseInt(history.stats[sortStats[0]])
                            : history.stats[sortStats[0]])
                        );
                      }, 0)}
                  </p>
                )}
                <p>
                  {sortStats[1].split("_").join(" ")}{" "}
                  {element.history
                    ?.filter(
                      (history) => history.gameweek >= current - calcLength
                    )
                    .reduce((acc, history) => {
                      return (
                        acc +
                        (typeof history.stats[sortStats[1]] === "string"
                          ? parseInt(history.stats[sortStats[1]])
                          : history.stats[sortStats[1]])
                      );
                    }, 0)}
                </p>
                {sortStats[0] && (
                  <p>
                    {sortStats[1].split("_").join(" ")}
                    {" / "}
                    {sortStats[0].split("_").join(" ")}{" "}
                    {(
                      element.history
                        ?.filter(
                          (history) => history.gameweek >= current - calcLength
                        )
                        .reduce((acc, history) => {
                          return (
                            acc +
                            (typeof history.stats[sortStats[1]] === "string"
                              ? parseInt(history.stats[sortStats[1]])
                              : history.stats[sortStats[1]])
                          );
                        }, 0) /
                      element.history
                        ?.filter(
                          (history) => history.gameweek >= current - calcLength
                        )
                        .reduce((acc, history) => {
                          return (
                            acc +
                            (typeof history.stats[sortStats[0]] === "string"
                              ? parseInt(history.stats[sortStats[0]])
                              : history.stats[sortStats[0]])
                          );
                        }, 0)
                    ).toFixed(2)}
                  </p>
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
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    paddingLeft: "12px",
                    color: "white",
                    minWidth: "120px",
                    background: "grey",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 1)",
                  }}
                >
                  <p> Gameweek </p>
                  <p> Minutes </p>
                  <p> Points</p>
                  <p> Bonus</p>
                  <p> BPS</p>
                  <p> Goals Scored</p>
                  <p> Creativity</p>
                  <p> Threat</p>
                  <p> Influence</p>
                  <p> ICT Index</p>
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
                    background: "grey",
                  }}
                ></div>

                {element?.history
                  ?.filter((history) => history.gameweek < current)
                  .map((history) =>
                    history.stats.minutes ? (
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          justifyContent: "space-around",
                          alignItems: "center",
                          minWidth: "40px",
                          border: "1px solid grey",
                          borderLeft:
                            history.gameweek === current - calcLength
                              ? "3px solid rgba(255, 105, 180, 1)"
                              : "1px solid grey",
                          borderRight:
                            history.gameweek === current - 1
                              ? "3px solid rgba(255, 105, 180, 1)"
                              : "1px solid grey",
                          background:
                            history.gameweek % 2 === 0
                              ? "rgba(255, 105, 180, .3)"
                              : "white",
                        }}
                        key={element.id + "_" + history.gameweek}
                      >
                        <p>{history.gameweek + 1}</p>
                        <p>{history.stats.minutes}</p>
                        <p>{history.stats.total_points}</p>
                        <p>{history.stats.bonus}</p>
                        <p>{history.stats.bps}</p>
                        <p>{history.stats.goals_scored}</p>

                        <p>
                          {Math.floor(parseFloat(history.stats.creativity))}
                        </p>
                        <p>{Math.floor(parseFloat(history.stats.threat))}</p>
                        <p>{Math.floor(parseFloat(history.stats.influence))}</p>
                        <p>{Math.floor(parseFloat(history.stats.ict_index))}</p>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          justifyContent: "space-around",
                          alignItems: "center",
                          minWidth: "40px",
                          border: "1px solid grey",
                          background: "grey",
                          borderLeft:
                            history.gameweek === current - calcLength
                              ? "3px solid rgba(255, 105, 180, 1)"
                              : "1px solid grey",
                          borderRight:
                            history.gameweek === current - 1
                              ? "3px solid rgba(255, 105, 180, 1)"
                              : "1px solid grey",
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
