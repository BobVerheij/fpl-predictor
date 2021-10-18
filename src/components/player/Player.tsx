import React, { useEffect } from "react";
import { useState } from "react";
import { useStore } from "../../stores/ZustandStore";

import * as Styled from "./Player.styled";

interface PlayerProps {
  hasPhoto?: boolean;
  imageSide?: string;
  playerID: number;
  reason?: string;
  sizing?: number;
}

const Player = ({ hasPhoto, imageSide, playerID, sizing }: PlayerProps) => {
  const sort = useStore((state) => state.sort);
  const positionFilter = useStore((state) => state.positionFilter);
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const player = bootstrap?.elements?.find(
    (element) => element.id === playerID
  );
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    setSize("S");
    if (sizing === 1) setSize("L");
    if (sizing === 2) setSize("M");
  }, [sort, positionFilter, current]);

  const picURL = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player?.code}.png`;
  const playerHistory = player?.history[current - 1].stats;
  const playerHistoryExplained = player?.history[current - 1].explain;

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
      image={size !== "S" && player?.code ? picURL : ""}
    >
      {size !== "S" && (
        <Styled.ScoreInfo imageSide={imageSide}>
          {playerHistoryExplained[0].stats
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
                {stat.identifier.split("_").join(" ")}:{" "}
                {stat.identifier !== "bonus" ? stat.value : playerHistory.bps}
                <span>{stat.points}</span>
              </Styled.Score>
            ))}
          {ictList.map((i) =>
            Math.floor(parseInt(playerHistory[i])) ? (
              <Styled.Score
                key={`${player.id} ${i}`}
                colorOption={"rgb(137, 44, 226)"}
              >
                {i === "ict_index" ? "ICT index" : i}:{" "}
                <span>{Math.floor(parseInt(playerHistory[i]))}</span>
              </Styled.Score>
            ) : null
          )}
        </Styled.ScoreInfo>
      )}

      <Styled.PlayerName onClick={() => changeSize()} size={size}>
        <Styled.Name>{`${player?.web_name}`}</Styled.Name>

        <Styled.TotalPoints>
          {playerHistory.in_dreamteam && (
            <Styled.SVG url={"images/star.svg"}></Styled.SVG>
          )}
          <p>{playerHistory.total_points}</p>
        </Styled.TotalPoints>
        <Styled.SVG
          url={size === "S" ? "images/arrow-down.svg" : "images/arrow-up.svg"}
        ></Styled.SVG>
      </Styled.PlayerName>
    </Styled.Player>
  );
};

export default Player;
