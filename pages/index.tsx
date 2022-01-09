import React, { useEffect, useState } from "react";
import { NewElement } from "../src/types/Types";
import { useStore } from "../src/stores/ZustandStore";
import FilterBar from "../src/components/filters/FilterBar";
import PlayerCard from "../src/components/playercard/PlayerCard";
import SortBar from "../src/components/filters/SortBar";
import { element } from "prop-types";

const GameWeekPage = () => {
  const [, setSortStats] = useState<string[]>([, "total_points"]);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const isLoading = useStore((state) => state.isLoading);
  const liveDetails = useStore((state) => state.liveDetails);

  const positionFilter = useStore((state) => state.positionFilter);
  const sort = useStore((state) => state.sort);

  const [thisLive, setThisLive] = useState(current || 0);

  const live = liveDetails?.[thisLive];

  const sortedLiveElements = live?.elements?.sort(
    (a, b) => b.stats[sort[0]] - a.stats[sort[0]]
  );

  const filteredLiveElements = sortedLiveElements?.filter((element) =>
    positionFilter.includes(
      bootstrap?.elements?.find((player) => player.id === element.id)
        .element_type
    )
  );

  const limitedLiveElements = filteredLiveElements?.slice(0, 20);

  const limitedPlayers = limitedLiveElements?.map((lim) =>
    bootstrap?.elements?.find((player) => player.id === lim.id)
  );
  useEffect(() => {
    if (sort.length < 2) {
      setSortStats([, ...sort]);
    } else {
      setSortStats([...sort].splice(0, 2));
    }
  }, [sort]);

  useEffect(() => {
    setThisLive(current - 1);
  }, [current]);

  return (
    <>
      <div
        style={{
          gap: "1rem",
          margin: "0 auto",
          marginTop: "var(--header-height)",
          maxWidth: "400px",
          width: "90vw",
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {limitedPlayers
          ? limitedPlayers?.map((player, index) => (
              <PlayerCard
                initOpen={index === 0}
                weekDetails={limitedLiveElements[index]}
                key={player.id}
                player={bootstrap.elements.find(
                  (element) => element.id === player.id
                )}
                isLoading={isLoading}
              ></PlayerCard>
            ))
          : null}
      </div>
    </>
  );
};

export default GameWeekPage;
