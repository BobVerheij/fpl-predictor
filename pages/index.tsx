import { useStore } from "../src/stores/ZustandStore";
import FilterBar from "../src/components/filters/FilterBar";
import NavBar from "../src/components/navigation/NavBar";
import Player from "../src/components/player/Player";
import React, { useEffect, useState } from "react";
import SortBar from "../src/components/filters/SortBar";

import LoadingAnimation from "../src/components/loading/LoadingAnimation";

const GameWeekPage = () => {
  const [, setSortStats] = useState<string[]>([, "total_points"]);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const isLoading = useStore((state) => state.isLoading);
  const liveDetails = useStore((state) => state.liveDetails);
  const positionFilter = useStore((state) => state.positionFilter);
  const sort = useStore((state) => state.sort);

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
          width: "90vw",
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {bootstrap?.elements
          .filter(
            (player) =>
              player.history?.[current - 1]?.stats.minutes !== null &&
              positionFilter.includes(player.element_type)
          )
          .sort(
            (a, b) =>
              b.history?.[current - 1]?.stats?.[sort[0]] -
              a.history?.[current - 1]?.stats?.[sort[0]]
          )
          .slice(0, 20)
          .map((player, index) => (
            <Player
              key={player.id}
              imageSide={index % 2 === 0 ? "left" : "right"}
              reason={"Most Captained"}
              playerID={player.id}
            ></Player>
          ))}
      </div>
    </>
  );
};

export default GameWeekPage;
