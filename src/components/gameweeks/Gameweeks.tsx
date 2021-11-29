import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import * as Styled from "../../components/test/PlayerCard.styled";
import { Timeline } from "antd";
import { useStore } from "../../stores/ZustandStore";
import { LoadingOutlined, RightCircleFilled } from "@ant-design/icons";
import { NewElement } from "../../types/Types";
import { Score } from "../player/Player.styled";

interface IGameweeks {
  player: NewElement;
  active: boolean;
}

const Gameweeks = ({ player, active }: IGameweeks) => {
  const current = useStore((state) => state.current);
  const setCurrent = useStore((state) => state.setCurrent);
  const sort = useStore((state) => state.sort);
  const [info, setInfo] = useState<string>("");
  const [infoVisible, setInfoVisible] = useState<boolean>(false);

  interface IGameweek {
    week: number;
    color?: string;
  }

  const Gameweek = ({ week, color }: IGameweek) => {
    return (
      <div id={week?.toString()}>
        <Timeline.Item
          position="left"
          dot={
            <div
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "100%",
                background: color || "var(--primary)",
              }}
            />
          }
        >
          <div
            onClick={() => setCurrent(week)}
            style={{
              width: "0",
              height: "1.5rem",
              margin: "0",
              position: "relative",
              left: "-250%",
              padding: "0.2rem 0.4rem",
              textAlign: "center",
              fontSize: "0.66rem",
              borderRadius: "10rem",
            }}
          ></div>
        </Timeline.Item>
      </div>
    );
  };

  const arr = [4, 3, 2, 1];

  return (
    <>
      {active && (
        <Styled.Gameweeks>
          <Timeline mode="left">
            {arr.map((item) => {
              if (current - item > 0) return <Gameweek week={current - item} />;
            })}
            <Timeline.Item
              dot={<RightCircleFilled style={{ color: "grey" }} />}
            >
              <div style={{ height: "1.5rem" }}></div>
            </Timeline.Item>
            {current + 1 <= 13 ? (
              <Gameweek week={current + 1} color={"var(--secondary)"} />
            ) : (
              <Timeline.Item
                dot={
                  <LoadingOutlined
                    style={{ marginTop: "1rem", color: "grey" }}
                  />
                }
              ></Timeline.Item>
            )}
          </Timeline>
        </Styled.Gameweeks>
      )}
    </>
  );
};
export default Gameweeks;
