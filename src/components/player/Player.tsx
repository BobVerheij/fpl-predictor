import { fetchBootstrap, fetchLive } from "fpl-api";
import React, { useEffect } from "react";
import { useState } from "react";
import { useStore } from "../../stores/ZustandStore";
import { NewElement } from "../../types/Types";

import * as Styled from "./Player.styled";

interface PlayerProps {
  imageSide?: string;
  playerID: number;
  reason?: string;
  sizing?: number;
}

const Player = ({ imageSide, playerID, sizing }: PlayerProps) => {
  const sort = useStore((state) => state.sort);
  const positionFilter = useStore((state) => state.positionFilter);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setLiveDetails = useStore((state) => state.setLiveDetails);

  const setMockHistory = () => {
    let h = [];
    for (let i = 0; i <= 12; i++) {
      h.push({
        id: i,
        stats: {
          minutes: Math.floor(Math.random() * 90),
          goals_scored: Math.floor(Math.random() * 4),
          assists: Math.floor(Math.random() * 4),
          clean_sheets: Math.floor(Math.random() * 2),
          goals_conceded: Math.floor(Math.random() * 5),
          own_goals: Math.floor(Math.random() * 2),
          penalties_saved: Math.floor(Math.random() * 3),
          penalties_missed: Math.floor(Math.random() * 3),
          yellow_cards: Math.floor(Math.random() * 2),
          red_cards: Math.floor(Math.random() * 2),
          saves: Math.floor(Math.random() * 10),
          bonus: Math.floor(Math.random() * 4),
          bps: Math.floor(Math.random() * 100),
          influence: (Math.random() * 100).toString(),
          creativity: (Math.random() * 100).toString(),
          threat: (Math.random() * 100).toString(),
          ict_index: (Math.random() * 100).toString(),
          total_points: Math.floor(Math.random() * 30),
          in_dreamteam: false,
        },
        explain: null,
        gameweek: i + 1,
      });
    }
    return h;
  };

  const mockPlayer: NewElement = {
    web_name: "Mock Player",
    total_points: 100,
    history: setMockHistory(),
  };

  const player: NewElement =
    bootstrap?.elements?.find((element) => element.id === playerID) ??
    mockPlayer;

  const [size, setSize] = useState<string>("");

  useEffect(() => {
    setSize("M");
  }, []);

  const picURL = player.code
    ? `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player?.code}.png`
    : `https://resources.premierleague.com/premierleague/photos/players/110x140/p169187.png`;

  const playerHistory = player?.history?.[current - 1]?.stats;
  const playerHistoryExplained = player?.history?.[current - 1]?.explain;

  const changeSize = () => {
    if (size === "S") {
      setSize("M");
    } else {
      setSize("S");
    }
  };

  const ictList = ["creativity", "influence", "threat", "ict_index"];

  return (
    <Styled.Player
      size={size}
      imageSide={imageSide}
      image={size !== "S" && picURL}
    >
      {size !== "S" && (
        <Styled.ScoreInfo imageSide={imageSide}>
          <a href={`/player/${player?.id}`}>{`see player >>>`}</a>
          {playerHistoryExplained?.[0].stats
            .filter((stat) => stat.value !== 0)
            .map((stat) => (
              <Styled.Score
                key={`${player.id} ${stat.value} ${stat.identifier}`}
                colorOption={
                  stat.identifier === "goals_conceded" ||
                  stat.identifier === "yellow_cards"
                    ? "yellow"
                    : stat.identifier === "red_cards" ||
                      stat.identifier === "own_goals"
                    ? "red"
                    : "var(--secondary)"
                }
              >
                <p>{stat.identifier.split("_").join(" ")}: </p>
                <p>
                  {stat.identifier !== "bonus" ? stat.value : playerHistory.bps}
                </p>
                <p>{stat.points}</p>
              </Styled.Score>
            ))}
          {ictList.map((i) =>
            Math.floor(parseInt(playerHistory?.[i])) ? (
              <Styled.Score
                key={`${player.id} ${i}`}
                colorOption={"var(--secondary60)"}
              >
                <p>{i === "ict_index" ? "ICT index" : i}: </p>
                <p>{Math.floor(parseInt(playerHistory[i]))}</p>
              </Styled.Score>
            ) : null
          )}
        </Styled.ScoreInfo>
      )}

      <Styled.PlayerName onClick={() => changeSize()} size={size}>
        <Styled.Name>{`${player?.web_name}`}</Styled.Name>

        <Styled.TotalPoints>
          {player?.history?.[current - 1]?.stats.total_points}
        </Styled.TotalPoints>

        {playerHistory?.in_dreamteam && (
          <Styled.SVG url={"images/star.svg"}></Styled.SVG>
        )}

        <Styled.SVG
          url={size === "S" ? "images/arrow-down.svg" : "images/arrow-up.svg"}
        ></Styled.SVG>
      </Styled.PlayerName>
    </Styled.Player>
  );
};

export default Player;
