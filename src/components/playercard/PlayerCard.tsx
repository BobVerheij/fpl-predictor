import React, { useEffect } from "react";
import { Badge, Button, Card, Drawer, Switch } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { NewElement } from "../../types/Types";
import { Score } from "../player/Player.styled";
import { useState } from "react";
import { useStore } from "../../stores/ZustandStore";
import { uuid } from "uuidv4";
import * as Styled from "./PlayerCard.styled";
import { Timeline } from "../timeline/Timeline";

interface IPlayerCard {
  player: NewElement;
  isLoading?: boolean;
}

const PlayerCard = ({ player, isLoading }: IPlayerCard) => {
  const [active, toggleActive] = useState<boolean>(false);
  const [open, toggleOpen] = useState<boolean>(false);
  const current = useStore((state) => state.current);
  const [showGameweek, setShowGameweek] = useState<number>(current);
  const sort = useStore((state) => state.sort);

  const playerHistory = player?.history?.[showGameweek - 1]?.stats;
  const playerHistoryExplained = player?.history?.[showGameweek - 1]?.explain;

  const ictList = ["creativity", "influence", "threat"];

  useEffect(() => {
    setShowGameweek(current);
  }, [current, active, sort]);

  const handleClick = (input: number) => {
    setShowGameweek(input);
  };

  const Cover = () => {
    return (
      <>
        <Styled.PlayerCard
          open={open}
          photo={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player?.code}.png`}
          active={active}
          className="site-drawer-render-in-current-wrapper"
        >
          {!active && (
            <Styled.PlayerBasics>
              <h1>
                {player.first_name} <b>{player.second_name}</b>
              </h1>
              <Button onClick={() => toggleActive(!active)} type="ghost">
                See More
              </Button>
              <p>
                {sort[0].replace("_", " ")}{" "}
                {player.history?.[showGameweek - 1]?.stats?.[sort[0]]}
              </p>
            </Styled.PlayerBasics>
          )}
          <Drawer
            keyboard
            forceRender
            placement="right"
            closable={false}
            onClose={() => toggleActive(!active)}
            visible={active}
            getContainer={false}
            width="60%"
            drawerStyle={{ background: "none !important" }}
            style={{ position: "absolute", boxShadow: "none" }}
            maskStyle={{ background: "none !important" }}
            contentWrapperStyle={{ background: "none !important" }}
            bodyStyle={{
              backdropFilter: "blur(10)",
              background: "none !important",
            }}
          >
            <Timeline
              handleClick={handleClick}
              showGameweek={showGameweek}
              active={active}
            />

            <h1
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: 700,
                color: "var(--primary90)",
              }}
            >
              Gameweek: {showGameweek}
            </h1>
            {playerHistoryExplained?.[0]?.stats
              ?.filter((stat) => stat.value !== 0)
              .map((stat) => (
                <Score key={uuid()}>
                  <p className="key">
                    {stat?.identifier.split("_").join(" ")}:{" "}
                  </p>
                  {stat?.identifier === "yellow_cards" && (
                    <div className="yellow"></div>
                  )}
                  {stat?.identifier === "red_cards" && (
                    <div className="red"></div>
                  )}
                  <p className="score-points">
                    {stat?.identifier !== "bonus"
                      ? stat.value
                      : playerHistory.bps}
                  </p>
                  <p className="score-total">{stat.points}</p>
                </Score>
              ))}
            <Score
              style={{
                borderTop: "2px solid var(--secondary)",
                paddingTop: "0.5rem",
                margin: "0.75rem 0 1rem auto",
              }}
            >
              <p className="key">Total Points:</p>
              <p className="score-total solo">
                {player?.history?.[showGameweek - 1]?.stats?.total_points}
              </p>
            </Score>
            {ictList.map((i) =>
              Math.floor(parseInt(playerHistory?.[i])) ? (
                <Score key={uuid()}>
                  <p className="key">{i === "ict_index" ? "ICT index" : i}: </p>
                  <p className="score-total solo">
                    {Math.floor(parseInt(playerHistory[i]))}
                  </p>
                </Score>
              ) : null
            )}
            <Score
              style={{
                borderTop: "2px solid var(--secondary)",
                paddingTop: "0.5rem",
                margin: "0.75rem 0 1rem auto",
              }}
            >
              <p className="key">ICT Index:</p>
              <p className="score-total solo">
                {player?.history?.[showGameweek - 1]?.stats?.ict_index}
              </p>
            </Score>
          </Drawer>
        </Styled.PlayerCard>
      </>
    );
  };

  return (
    <Card
      hoverable
      style={{
        cursor: "auto",
        width: "90vw",
        maxWidth: "400px",
        borderRadius: "0.5rem",
      }}
      bodyStyle={{
        padding: "1rem",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      cover={Cover()}
    >
      <Badge
        style={{
          backgroundColor: "var(--secondary)",
          fontWeight: 900,
          color: "black",
        }}
        count={
          !isLoading ? player.history?.[showGameweek - 1]?.stats?.[sort[0]] : 0
        }
      >
        <Button
          style={{
            border: "1px solid var(--primary)",
            gap: "12px",
            color: "var(--primary)",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "150px",
          }}
          ghost
        >
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              padding: "0",
              margin: "0",
            }}
          >
            {!isLoading ? player?.web_name : "Loading"}
          </p>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading && <LoadingOutlined></LoadingOutlined>}
          </div>
        </Button>
      </Badge>
      <Switch
        disabled={isLoading}
        defaultChecked={false}
        onChange={() => {
          toggleActive(false);
          toggleOpen(!open);
        }}
        onClick={() => {
          toggleActive(false);
          toggleOpen(!open);
        }}
        style={{
          marginLeft: "auto",
        }}
      ></Switch>
    </Card>
  );
};

export default PlayerCard;
