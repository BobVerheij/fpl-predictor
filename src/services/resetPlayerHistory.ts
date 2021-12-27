import { highestOptions } from "../constants/HighestOptions";
import { NewElement } from "../types/Types";

export const resetAllPlayerHistory = (bootstrap, liveDetails) => {
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

  return liveDetails;
};
