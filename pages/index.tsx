import { useStore } from "../src/stores/ZustandStore";
import FilterBar from "../src/components/filters/FilterBar";
import NavBar from "../src/components/navigation/NavBar";
import Player from "../src/components/player/Player";
import React, { useEffect, useState } from "react";
import SortBar from "../src/components/filters/SortBar";

import LoadingAnimation from "../src/components/loading/LoadingAnimation";
import { NewElement } from "../src/types/Types";
import { random } from "lodash";

const GameWeekPage = () => {
  const [, setSortStats] = useState<string[]>([, "total_points"]);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const isLoading = useStore((state) => state.isLoading);

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
      <Player imageSide="left" playerID={null}></Player>
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
        <p>{current}</p>
        <p>{sort[0]}</p>
        {bootstrap?.elements
          ?.filter((player) => positionFilter.includes(player.element_type))
          .sort(
            (a: NewElement, b: NewElement) =>
              b.history?.find((history) => history?.gameweek === current - 1)
                ?.stats?.[sort[0]] -
              a.history?.find((history) => history?.gameweek === current - 1)
                ?.stats?.[sort[0]]
          )
          .slice(0, 20)
          .map((player: NewElement, index) => (
            <>
              <p>
                {
                  player.history?.find(
                    (history) => history?.gameweek === current - 1
                  )?.stats?.[sort[0]]
                }
              </p>
              <Player
                key={player.id}
                imageSide={index % 2 === 0 ? "left" : "right"}
                playerID={player.id}
              ></Player>
            </>
          ))}
      </div>
    </>
  );
};

export default GameWeekPage;
