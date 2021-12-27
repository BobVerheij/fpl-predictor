import React, { useState } from "react";
import { NewElement } from "../../types/Types";
import * as Styled from "./StatsContainer.styled";

import { useStore } from "../../stores/ZustandStore";

import { Badge, Button, Drawer, Switch } from "antd";
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";

import { Difficulties } from "./Difficulties";

interface StatsContainerProps {
  element: { player: NewElement; stat: number; count: number };
  range: number[];
}

const StatsContainer = ({ element, range }: StatsContainerProps) => {
  const bootstrap = useStore((state) => state.bootstrap);
  const fixtures = useStore((state) => state.fixtures);
  const { player, stat, count } = element;
  const isLoading = useStore((state) => state.isLoading);
  const [open, toggleOpen] = useState(false);
  const [active, toggleActive] = useState(false);
  const liveDetails = useStore((state) => state.liveDetails);

  const nextGameweekDifficulties = [...fixtures]
    .filter(
      (fixture) =>
        (fixture.team_a === player.team || fixture.team_h === player.team) &&
        !fixture.finished &&
        fixture.kickoff_time
    )
    .sort(
      (a, b) =>
        new Date(a.kickoff_time).getTime() - new Date(b.kickoff_time).getTime()
    )
    .slice(0, 5)
    .map((fixture) => {
      if (fixture.team_a === player.team) {
        return fixture.team_a_difficulty;
      }
      return fixture.team_h_difficulty;
    });

  const averages = [...nextGameweekDifficulties].reduce(
    (acc, val) => {
      return [acc[0] + val, acc[1] + 1];
    },
    [0, 0]
  );

  const Cover = () => {
    return (
      <>
        <Styled.StatsCard
          open={open}
          photo={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player?.code}.png`}
          active={active}
          className="site-drawer-render-in-current-wrapper"
        >
          <Button onClick={() => toggleActive(!active)}> - - - </Button>
          <Difficulties values={nextGameweekDifficulties} average={averages} />
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
            style={{
              position: "absolute",
              boxShadow: "none",
              overflow: "hidden",
            }}
            maskStyle={{ background: "none !important" }}
            contentWrapperStyle={{
              background: "none !important",
            }}
            bodyStyle={{
              backdropFilter: "blur(10)",
              background: "none !important",
            }}
          >
            {liveDetails?.map((live) => (
              <>
                <Styled.Stat>
                  {
                    live?.elements?.find((el) => player?.id === el.id)?.stats
                      .minutes
                  }
                </Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
                <Styled.Stat>test</Styled.Stat>
              </>
            ))}
          </Drawer>
        </Styled.StatsCard>
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
        style={{ backgroundColor: "var(--secondary)", color: "black" }}
        count={stat.toFixed(2)}
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

      <p>
        {count} / {range[1] - range[0]}
      </p>

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
      {player.news && (
        <WarningOutlined
          onClick={() => {}}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "-0.66rem",
            top: "-0.66rem",
            color: "white",
            backgroundColor: "var(--primary)",
            fontSize: "1rem",
            padding: "0.4rem",
            borderRadius: ".5rem",
          }}
        ></WarningOutlined>
      )}
    </Styled.SCard>
  );
};

export default StatsContainer;
