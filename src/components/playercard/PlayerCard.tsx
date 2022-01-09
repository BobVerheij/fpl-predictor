import React, { useEffect } from "react";
import { Badge, Button, Drawer, Switch } from "antd";
import {
  LoadingOutlined,
  StarFilled,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { NewElement } from "../../types/Types";
import { Score } from "../player/Player.styled";
import { useState } from "react";
import { useStore } from "../../stores/ZustandStore";
import { uuid } from "uuidv4";
import * as Styled from "./PlayerCard.styled";
import { Timeline } from "../timeline/Timeline";
import { LiveElement } from "fpl-api";

interface IPlayerCard {
  weekDetails: LiveElement;
  initOpen: boolean;
  player: NewElement;
  isLoading?: boolean;
}

const PlayerCard = ({
  weekDetails,
  initOpen,
  player,
  isLoading,
}: IPlayerCard) => {
  const [active, toggleActive] = useState<boolean>(false);
  const [currentLiveDetails, setCurrentLiveDetails] = useState(weekDetails);
  const [open, toggleOpen] = useState<boolean>(initOpen);
  const current = useStore((state) => state.current);
  const ictList = ["creativity", "influence", "threat"];
  const sort = useStore((state) => state.sort);
  const liveDetails = useStore((state) => state.liveDetails);
  const [gameweek, setGameweek] = useState<number>(0);

  useEffect(() => {
    setCurrentLiveDetails(weekDetails);
  }, [weekDetails]);

  useEffect(() => {
    setGameweek(current);
  }, [current, active, sort]);

  const handleClick = async (d: number) => {
    console.log(gameweek);
    setGameweek(gameweek + d);
  };

  useEffect(() => {
    setCurrentLiveDetails(
      liveDetails?.[gameweek - 1]?.elements?.find(
        (element) => element.id === weekDetails?.id
      )
    );
  }, [gameweek]);

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
                {player?.first_name} <b>{player?.second_name}</b>
              </h1>
              <Button onClick={() => toggleActive(!active)} type="ghost">
                See More
              </Button>
              <p>
                {sort[0].replace("_", " ")} {currentLiveDetails?.stats[sort[0]]}
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
              updateLiveDetails={() => {}}
              handleClick={handleClick}
              gameweek={gameweek}
              active={active}
            />

            {currentLiveDetails?.stats.minutes > 0 ? (
              <h1
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "var(--primary90)",
                }}
              >
                Gameweek: {gameweek}
              </h1>
            ) : (
              <h2 style={{ textAlign: "center" }}>
                <b>{player?.web_name}</b> has not played in
                <b> Gameweek {gameweek}</b>
              </h2>
            )}

            {currentLiveDetails?.stats.minutes > 0 &&
              currentLiveDetails?.explain.map((ex) =>
                ex.stats.map((stat) => (
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
                        : currentLiveDetails?.stats.bps}
                    </p>
                    <p className="score-total">{stat?.points}</p>
                  </Score>
                ))
              )}
            {currentLiveDetails?.stats.minutes > 0 && (
              <>
                <Score
                  style={{
                    borderTop: "2px solid var(--secondary)",
                    paddingTop: "0.5rem",
                    margin: "0.75rem 0 1rem auto",
                  }}
                >
                  <p className="key">Total Points:</p>
                  <p className="score-total solo">
                    {currentLiveDetails?.stats?.total_points}
                  </p>
                </Score>
                {ictList.map((i) =>
                  Math.floor(parseInt(currentLiveDetails?.stats?.[i])) ? (
                    <Score key={uuid()}>
                      <p className="key">
                        {i === "ict_index" ? "ICT index" : i}:{" "}
                      </p>
                      <p className="score-total solo">
                        {Math.floor(parseInt(currentLiveDetails?.stats?.[i]))}
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
                    {Math.floor(parseInt(currentLiveDetails?.stats?.ict_index))}
                  </p>
                </Score>
              </>
            )}
          </Drawer>
        </Styled.PlayerCard>
      </>
    );
  };

  return (
    <Styled.SCard
      hoverable
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
        count={!isLoading ? currentLiveDetails?.stats?.[sort[0]] : 0}
      >
        <Button
          type="default"
          style={{
            border: "1px solid var(--primary)",
            gap: "12px",
            color: "var(--primary)",
            backdropFilter: "blur(10)",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "150px",
          }}
        >
          <p
            style={{
              fontWeight: 600,
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
      {currentLiveDetails?.stats.in_dreamteam && (
        <StarOutlined style={{ marginLeft: "1rem" }}></StarOutlined>
      )}
      <Switch
        disabled={isLoading}
        defaultChecked={initOpen ? true : false}
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
    </Styled.SCard>
  );
};

export default PlayerCard;
