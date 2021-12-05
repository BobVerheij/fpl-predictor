import React, { useEffect, useState } from "react";
import * as Styled from "./Timeline.styled";
import {
  ArrowRightOutlined,
  LoadingOutlined,
  MessageFilled,
  MessageOutlined,
  RightCircleFilled,
} from "@ant-design/icons";
import { Badge } from "antd";

interface ITimeline {
  showGameweek: number;
  active: boolean;
  handleClick: (input: number) => void;
}

export const Timeline = ({ showGameweek, active, handleClick }: ITimeline) => {
  const [message, setMessage] = useState("");

  const [info, setInfo] = useState<{ n: number }>({ n: null });

  useEffect(() => {
    console.log(message);
  }, [message]);

  useEffect(() => {
    setMessage("");
  }, [showGameweek]);

  return (
    <Styled.Timeline active={active}>
      {showGameweek - 3 > 0 && (
        <Styled.Wrapper>
          <Styled.Dot
            onClick={() => {
              handleClick(showGameweek - 3);
            }}
            onMouseOver={() =>
              setMessage("Go to Gameweek " + (showGameweek - 3))
            }
            onMouseLeave={() => setMessage("")}
            type="past"
          ></Styled.Dot>
          <Styled.Line />
        </Styled.Wrapper>
      )}
      {showGameweek - 2 > 0 && (
        <Styled.Wrapper>
          <Styled.Dot
            onClick={() => {
              handleClick(showGameweek - 2);
            }}
            onMouseOver={() =>
              setMessage("Go to Gameweek " + (showGameweek - 2))
            }
            onMouseLeave={() => setMessage("")}
            type="past"
          ></Styled.Dot>
          <Styled.Line />
        </Styled.Wrapper>
      )}
      {showGameweek - 1 > 0 && (
        <Styled.Wrapper>
          <Styled.Dot
            onClick={() => {
              handleClick(showGameweek - 1);
            }}
            onMouseOver={() =>
              setMessage("Go to Gameweek " + (showGameweek - 1))
            }
            onMouseLeave={() => setMessage("")}
            type="past"
          ></Styled.Dot>
          <Styled.Line />
        </Styled.Wrapper>
      )}
      {showGameweek && (
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
            if (!(showGameweek + 1 > 15)) {
              handleClick(showGameweek + 1);
            }
          }}
          onMouseOver={() => {
            if (!(showGameweek + 1 > 15)) {
              setMessage("Go to Gameweek " + (showGameweek + 1));
            }
          }}
          onMouseLeave={() => setMessage("")}
          type="future"
        >
          {showGameweek + 1 > 15 && <LoadingOutlined></LoadingOutlined>}
        </Styled.Dot>
        <Styled.Line hide={!(showGameweek + 2 <= 16)} />
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
