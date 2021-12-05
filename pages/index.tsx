import React, { useEffect, useState } from "react";
import { NewElement } from "../src/types/Types";
import { useStore } from "../src/stores/ZustandStore";
import { uuid } from "uuidv4";
import FilterBar from "../src/components/filters/FilterBar";
import LoadingAnimation from "../src/components/loading/LoadingAnimation";
import PlayerCard from "../src/components/playercard/PlayerCard";
import SortBar from "../src/components/filters/SortBar";

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
      {isLoading && <LoadingAnimation />}
      <FilterBar></FilterBar>
      <SortBar></SortBar>

      <div
        style={{
          gap: "1rem",
          margin: "0 auto",
          maxWidth: "400px",
          width: "90vw",
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {bootstrap?.elements
          ?.filter((player) => positionFilter.includes(player.element_type))
          .sort(
            (a: NewElement, b: NewElement) =>
              b.history?.find((history) => history?.gameweek === current - 1)
                ?.stats?.[sort[0]] -
              a.history?.find((history) => history?.gameweek === current - 1)
                ?.stats?.[sort[0]]
          )
          .slice(0, 40)
          .map((player: NewElement, index) => (
            <PlayerCard
              key={uuid()}
              player={player}
              isLoading={isLoading}
            ></PlayerCard>
          ))}
      </div>
    </>
  );
};

export default GameWeekPage;

{
  /* <Player
  key={player.id}
  imageSide={index % 2 === 0 ? "left" : "right"}
  playerID={player.id}
></Player>; */
}
