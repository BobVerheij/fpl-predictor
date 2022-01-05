import React, { useState } from "react";
import { NewElement } from "../../types/Types";
import * as Styled from "./StatsContainer.styled";

import { useStore } from "../../stores/ZustandStore";

import { Badge, Button, Drawer, Switch } from "antd";
import {
  CiCircleOutlined,
  LoadingOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { Difficulties } from "./Difficulties";
import { CircleLoader } from "react-spinners";
import { reduce } from "lodash";
import Graph from "./graph/Graph";

interface StatsContainerProps {
  element: {
    player: NewElement;
    stat: number;
    count: number;
    difficulties: number[];
  };
}

const StatsContainer = ({ element }: StatsContainerProps) => {
  const [active, toggleActive] = useState(false);
  const [open, toggleOpen] = useState(false);
  const { player, stat } = element;
  const isLoading = useStore((state) => state.isLoading);
  const liveDetails = useStore((state) => state.liveDetails);
  const sort = useStore((state) => state.sort);
  const span = useStore((state) => state.span);

  const allMatches = liveDetails.map((details) =>
    details.elements.find((el) => player.id === el.id)
  );

  const playedMatches = [...allMatches].filter((pl) => pl?.stats?.minutes > 0);

  const spanRanges = allMatches.map((match) => {
    return {
      weekly: match?.stats[sort[0]] || null,
    };
  });

  let avgRanges = [];

  for (let i = 0; i <= allMatches.length - span; i++) {
    const spanData = [...allMatches]
      .slice(i, i + span)
      .filter((match) => match?.stats.minutes > 0);

    const spanValue = [...spanData].reduce(
      (acc, match) => acc + parseInt(match?.stats[sort[0]]),
      0
    );

    avgRanges.push({ avg: (spanValue / spanData.length).toFixed(2) });
    // spanRanges[Math.ceil(i + (span - 1) / 2)].avg = (
    //   spanValue / spanData.length
    // ).toFixed(2);
  }

  const photoUrl = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player?.code}.png`;

  console.log(avgRanges);
  const Cover = () => {
    return (
      <>
        <Styled.StatsCard
          open={open}
          photo={photoUrl}
          active={active}
          className="site-drawer-render-in-current-wrapper"
        >
          <Button onClick={() => toggleActive(!active)}> - - - </Button>
          <Difficulties values={element.difficulties} />
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
    <Styled.Container>
      <Graph avgData={avgRanges} data={spanRanges} photo={photoUrl}></Graph>

      <Styled.SCard
        active={open}
        status={player?.chance_of_playing_next_round?.toString()}
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
            color: "black",
            fontWeight: 900,
          }}
          count={stat.toFixed(2)}
        >
          <Button
            type="default"
            style={{
              border: "1px solid var(--primary)",
              borderColor:
                player.chance_of_playing_next_round === 0
                  ? "red"
                  : player.chance_of_playing_next_round === 25
                  ? "orange"
                  : player.chance_of_playing_next_round === 75
                  ? "yellow"
                  : "var(--primary)",
              gap: "12px",
              color: "var(--primary)",
              backdropFilter: "blur(10)",
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "150px",
              fontWeight: 900,
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

        {/* <p>
          {count} / {range[1] - range[0]}
        </p> */}

        {/* <Styled.Pricetag>
          £{player.now_cost / 10}
          {!(player.now_cost % 10) ? ".0" : ""}m
          <PlusCircleOutlined></PlusCircleOutlined>
        </Styled.Pricetag> */}

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
        {/* {player.news && (
        <ExclamationCircleOutlined
          onClick={() => {}}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "-0.66rem",
            top: "calc(50% - 0.7rem)",
            color: "white",
            backgroundColor:
              player.chance_of_playing_next_round === 0
                ? "red"
                : player.chance_of_playing_next_round === 25
                ? "orange"
                : player.chance_of_playing_next_round === 75
                ? "yellow"
                : "white",
            fontSize: "0.8rem",
            padding: "0.3rem",
            borderRadius: "0.2rem",
          }}
        ></ExclamationCircleOutlined>
      )} */}
      </Styled.SCard>
    </Styled.Container>
  );
};

export default StatsContainer;
