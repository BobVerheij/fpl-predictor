import { useStore } from "../src/stores/ZustandStore";
import FilterBar from "../src/components/filters/FilterBar";
import NavBar from "../src/components/navigation/NavBar";
import Player from "../src/components/player/Player";
import React, { useEffect, useState } from "react";
import SortBar from "../src/components/filters/SortBar";
import { resetAllPlayerHistory } from "../src/services/resetAllPlayerHistory";
import LoadingAnimation from "../src/components/loading/LoadingAnimation";

const GameWeekPage = () => {
  const [, setSortStats] = useState<string[]>([, "total_points"]);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const isLoading = useStore((state) => state.isLoading);
  const liveDetails = useStore((state) => state.liveDetails);
  const positionFilter = useStore((state) => state.positionFilter);
  const sort = useStore((state) => state.sort);

  // useEffect(() => {
  //   resetAllPlayerHistory();
  // }, []);

  useEffect(() => {
    if (sort.length < 2) {
      setSortStats([, ...sort]);
    } else {
      setSortStats([...sort].splice(0, 2));
    }
  }, [sort]);

  return (
    <>
      <NavBar />
      {isLoading && <LoadingAnimation />}
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
              (stat) =>
                parseInt(
                  liveDetails?.[current - 1]?.elements[b.id - 1]?.stats[stat]
                ) -
                parseInt(
                  liveDetails?.[current - 1]?.elements[a.id - 1]?.stats[stat]
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
      </div>
    </>
  );
};

export default GameWeekPage;
