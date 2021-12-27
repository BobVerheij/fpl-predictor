import React, { useEffect, useState } from "react";
import * as Styled from "./Timeline.styled";
import {
  ArrowRightOutlined,
  LoadingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useStore } from "../../stores/ZustandStore";

interface ITimeline {
  gameweek: number;
  active: boolean;
  handleClick: (input: number) => void;
  updateLiveDetails: () => void;
}

export const Timeline = ({ gameweek, active, handleClick }: ITimeline) => {
  const [message, setMessage] = useState("");
  const liveDetails = useStore((state) => state.liveDetails);

  useEffect(() => {
    setMessage("");
  }, [gameweek]);

  return (
    <Styled.Timeline active={active}>
      {gameweek - 3 > 0 && (
        <Styled.Wrapper>
          <Styled.Dot
            onClick={() => {
              handleClick(-3);
            }}
            onMouseOver={() => setMessage("Go to Gameweek " + (gameweek - 3))}
            onMouseLeave={() => setMessage("")}
            type="past"
          ></Styled.Dot>
          <Styled.Line />
        </Styled.Wrapper>
      )}
      {gameweek - 2 > 0 && (
        <Styled.Wrapper>
          <Styled.Dot
            onClick={() => {
              handleClick(-2);
            }}
            onMouseOver={() => setMessage("Go to Gameweek " + (gameweek - 2))}
            onMouseLeave={() => setMessage("")}
            type="past"
          ></Styled.Dot>
          <Styled.Line />
        </Styled.Wrapper>
      )}
      {gameweek - 1 > 0 && (
        <Styled.Wrapper>
          <Styled.Dot
            onClick={() => {
              handleClick(-1);
            }}
            onMouseOver={() => setMessage("Go to Gameweek " + (gameweek - 1))}
            onMouseLeave={() => setMessage("")}
            type="past"
          ></Styled.Dot>
          <Styled.Line />
        </Styled.Wrapper>
      )}
      {gameweek && (
        <Styled.Wrapper>
          <Styled.Dot type="present">
            <ArrowRightOutlined />
          </Styled.Dot>
          <Styled.Line />
        </Styled.Wrapper>
      )}
      <Styled.Wrapper>
        <Styled.Dot
          onClick={() => {
            if (!(gameweek + 1 > liveDetails.length)) {
              handleClick(1);
            }
          }}
          onMouseOver={() => {
            if (!(gameweek + 1 > liveDetails.length)) {
              setMessage("Go to Gameweek " + (gameweek + 1));
            }
          }}
          onMouseLeave={() => setMessage("")}
          type="future"
        >
          {gameweek + 1 > liveDetails?.length && (
            <LoadingOutlined></LoadingOutlined>
          )}
        </Styled.Dot>
        <Styled.Line hide={!(gameweek + 2 <= liveDetails?.length + 1)} />
      </Styled.Wrapper>
      {message && (
        <Styled.Message>
          <div>
            <p> {message}</p>
            <MessageOutlined />
          </div>
        </Styled.Message>
      )}
    </Styled.Timeline>
  );
};
