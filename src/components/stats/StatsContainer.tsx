import React, { useEffect, useState } from "react";
import { NewElement } from "../../types/Types";
import * as Styled from "./StatsContainer.styled";
import * as Borrowed from "../player/Player.styled";

import Stat from "./Stat";

import { highestOptions } from "../../constants/HighestOptions";
import { useStore } from "../../stores/ZustandStore";
import StatColumn from "./StatColumn";
import Graph from "./Graph";

import { uuid } from "uuidv4";

interface StatsContainerProps {
  element: NewElement;
  calcRange: number[];
}

const StatsContainer = ({ element, calcRange }: StatsContainerProps) => {
  const current = useStore((state) => state.current);

  const calcStart = calcRange[0];
  const data = element.history?.map((his) => {
    return {
      name: his.gameweek + 1,
      player: his.stats.total_points,
      best: his.highest.total_points,
    };
  });

  return (
    <Styled.StatsContainer
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column",
        overflow: "scroll",
        position: "relative",
      }}
      key={element.id}
    >
      {element.news && (
        <>
          <Borrowed.TotalPoints style={{ alignSelf: "end" }}>
            {element.news}
          </Borrowed.TotalPoints>
          <Borrowed.TotalPoints style={{ alignSelf: "end" }}>
            {element.chance_of_playing_next_round}
          </Borrowed.TotalPoints>
        </>
      )}
      <img
        width="33%"
        src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${element?.code}.png`}
        alt=""
      />

      <Graph
        calcRange={calcStart}
        data={data}
        playerName={element.web_name}
      ></Graph>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "row nowrap",
        }}
      >
        <Borrowed.PlayerName>
          <Borrowed.Name>{element.web_name}</Borrowed.Name>
          <Borrowed.TotalPoints>
            {Math.round(element.sortStats.a * 100) / 100}
          </Borrowed.TotalPoints>
          {element.sortStats.b && (
            <>
              <Borrowed.TotalPoints>
                {Math.round(element.sortStats.b * 100) / 100}
              </Borrowed.TotalPoints>
              <Borrowed.TotalPoints>
                {Math.round((element.sortStats.a / element.sortStats.b) * 100) /
                  100}
              </Borrowed.TotalPoints>
            </>
          )}
        </Borrowed.PlayerName>
      </div>

      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          overflow: "scroll",
          position: "relative",
          gap: "0.3em",
        }}
      >
        <div
          style={{
            order: -1000,
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
            paddingLeft: "12px",
            color: "white",
            minWidth: "120px",
            background: "var(--primary)",
            boxShadow: "0 0 20px rgba(0, 0, 0, 1)",
          }}
        >
          <p
            style={{
              textTransform: "capitalize",
              padding: "0",
              margin: "0",
              fontSize: "0.8rem",
            }}
          >
            Gameweek
          </p>
          {Object.keys(highestOptions).map((key) => (
            <p
              key={uuid()}
              style={{
                textTransform: "capitalize",
                padding: "0",
                margin: "0",
                fontSize: "0.8rem",
              }}
            >
              {key.split("_").join(" ")}
            </p>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            alignItems: "center",
            minWidth: `${
              element?.history?.find((history) => history?.id > 0).gameweek * 40
            }px`,
            background: "var(--primary)",
          }}
        ></div>

        {element?.history
          ?.filter((history) => history.gameweek < current)
          .map((history, index) =>
            history.stats.minutes ? (
              <StatColumn
                key={uuid()}
                calcStart={calcStart}
                history={history}
                index={index}
                id={element.id}
              >
                <>
                  <Stat
                    statName="gameweek"
                    value={history.gameweek + 1}
                    highest=""
                  ></Stat>
                  {Object.keys(history?.stats).map((key) => (
                    <Stat
                      key={uuid()}
                      statName={key}
                      value={history.stats[key]}
                      highest={history.highest[key]}
                    ></Stat>
                  ))}
                </>
              </StatColumn>
            ) : (
              <div
                style={{
                  order: -(index + 1),
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  minWidth: "20px",
                  background: "var(--primary)",
                  borderTop:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                  borderBottom:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                  borderLeft:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                  borderRight:
                    history.gameweek === current - 1
                      ? "4px solid var(--primary)"
                      : "",
                }}
              ></div>
            )
          )}
      </div>
    </Styled.StatsContainer>
  );
};

export default StatsContainer;
