import React from "react";
import * as Styled from "./WeekPicker.styled";
import { useStore } from "../../stores/ZustandStore";

const WeekPicker = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const isLoading = useStore((state) => state.isLoading);
  const liveDetails = useStore((state) => state.liveDetails);
  const setCurrent = useStore((state) => state.setCurrent);
  const current = useStore((state) => state.current);

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
    resetAllPlayerHistory();
  };

  return (
    <Styled.WeekPicker
      disabled={isLoading}
      defaultValue={current}
      onChange={(event) => {
        gameWeekChange(parseInt(event.target.value));
      }}
      name="gameweek"
      id="gameweek"
    >
      <option value="" disabled>
        Select a Game Week
      </option>
      {bootstrap?.events
        .filter((ev) => ev.finished === true || ev.is_current === true)
        .map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.name}
          </option>
        ))}
    </Styled.WeekPicker>
  );
};

export default WeekPicker;
