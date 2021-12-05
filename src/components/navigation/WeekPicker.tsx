import React from "react";
import * as Styled from "./WeekPicker.styled";
import { useStore } from "../../stores/ZustandStore";
import { highestOptions } from "../../constants/HighestOptions";
import { NewElement } from "../../types/Types";
import { uuid } from "uuidv4";

const WeekPicker = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const isLoading = useStore((state) => state.isLoading);
  const setCurrent = useStore((state) => state.setCurrent);
  const liveDetails = useStore((state) => state.liveDetails);

  const current = useStore((state) => state.current);

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
        let currentPlayer: NewElement = bootstrap.elements.find(
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
    resetAllPlayerHistory();
  };

  return (
    <Styled.WeekPicker
      disabled={isLoading}
      defaultValue={current}
      value={current}
      onChange={(event) => {
        gameWeekChange(parseInt(event.target.value));
      }}
      onBlur={(event) => {
        gameWeekChange(parseInt(event.target.value));
      }}
      name="gameweek"
      id="gameweek"
    >
      {bootstrap?.events
        ?.filter((ev) => ev.finished === true || ev.is_current === true)
        .map((ev) => (
          <option key={uuid()} value={ev.id}>
            {ev.name}
          </option>
        ))}
    </Styled.WeekPicker>
  );
};

export default WeekPicker;
