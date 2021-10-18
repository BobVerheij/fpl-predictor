import { fetchBootstrap, fetchLive } from "fpl-api";
import Player from "../src/components/player/Player";
import Lottie from "react-lottie-segments";
import * as ball from "../public/animations/fpl-ball.json";

import React, { useEffect, useState } from "react";

import { useStore } from "../src/stores/ZustandStore";

import NavBar from "../src/components/navigation/NavBar";
import FilterBar from "../src/components/filters/FilterBar";
import SortBar from "../src/components/filters/SortBar";

const GameWeekPage = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const current = useStore((state) => state.current);
  const setCurrent = useStore((state) => state.setCurrent);

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

  const resetAllPlayerHistory = (value) => {
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
    resetAllPlayerHistory(value);
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
          .sort(
            (a, b) =>
              (sort.includes("total_points") &&
                liveDetails?.[current - 1]?.elements[b.id - 1]?.stats
                  .total_points -
                  liveDetails?.[current - 1]?.elements[a.id - 1]?.stats
                    .total_points) ||
              (sort.includes("bps") &&
                liveDetails?.[current - 1]?.elements[b.id - 1]?.stats.bps -
                  liveDetails?.[current - 1]?.elements[a.id - 1]?.stats.bps) ||
              (sort.includes("bonus") &&
                liveDetails?.[current - 1]?.elements[b.id - 1]?.stats.bonus -
                  liveDetails?.[current - 1]?.elements[a.id - 1]?.stats
                    .bonus) ||
              (sort.includes("creativity") &&
                parseInt(
                  liveDetails?.[current - 1]?.elements[b.id - 1]?.stats
                    .creativity
                ) -
                  parseInt(
                    liveDetails?.[current - 1]?.elements[a.id - 1]?.stats
                      .creativity
                  )) ||
              (sort.includes("influence") &&
                parseInt(
                  liveDetails?.[current - 1]?.elements[b.id - 1]?.stats
                    .influence
                ) -
                  parseInt(
                    liveDetails?.[current - 1]?.elements[a.id - 1]?.stats
                      .influence
                  )) ||
              (sort.includes("threat") &&
                parseInt(
                  liveDetails?.[current - 1]?.elements[b.id - 1]?.stats.threat
                ) -
                  parseInt(
                    liveDetails?.[current - 1]?.elements[a.id - 1]?.stats.threat
                  )) ||
              (sort.includes("ict_index") &&
                parseInt(
                  liveDetails?.[current - 1]?.elements[b.id - 1]?.stats
                    .ict_index
                ) -
                  parseInt(
                    liveDetails?.[current - 1]?.elements[a.id - 1]?.stats
                      .ict_index
                  ))
          )
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
      </div>
    </>
  );
};

export default GameWeekPage;
