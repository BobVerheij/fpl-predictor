import React from "react";
import * as Styled from "./Slider.styled";
import { debounce } from "lodash";

const Slider = ({ onBlur, current, calcStart }) => {
  const array = Array.apply(
    null,
    Array(current ? current : 0).map((i) => i)
  );

  return (
    <Styled.Slider url={"images/arrow-up.svg"} count={current}>
      <div>
        {array.map((item, index) => (
          <div
            style={{
              width: `${100 / current}%`,
              borderTop: `${
                index + 1 > calcStart ? "0.2em solid var(--primary)" : ""
              }`,
              borderBottom: `${
                index + 1 > calcStart ? "0.2em solid var(--primary)" : ""
              }`,
              color: `${
                index + 1 === calcStart || index + 1 === current ? "white" : ""
              }`,
              borderTopRightRadius: `${
                index + 1 === calcStart ||
                (index + 1 < current && index + 1 > calcStart)
                  ? "0px"
                  : ""
              }`,
              borderTopLeftRadius: `${
                index + 1 === current ||
                (index + 1 < current && index + 1 > calcStart)
                  ? "0px"
                  : ""
              }`,
              borderBottomRightRadius: `${
                index + 1 === calcStart ||
                (index + 1 < current && index + 1 > calcStart)
                  ? "0px"
                  : ""
              }`,
              borderBottomLeftRadius: `${
                index + 1 === current ||
                (index + 1 < current && index + 1 > calcStart)
                  ? "0px"
                  : ""
              }`,

              backgroundColor: `${
                index + 1 === calcStart || index + 1 === current
                  ? "var(--primary)"
                  : index % 2 === 1
                  ? "white"
                  : "var(--secondary)"
              }`,
            }}
          >
            <p>{index + 1}</p>
          </div>
        ))}
      </div>
      <input
        id={"test"}
        name={"test"}
        onChange={debounce((event) => {
          onBlur(parseInt(event.target.value));
        }, 100)}
        type="range"
        min="1"
        max={current}
        defaultValue="1"
      />
    </Styled.Slider>
  );
};
export default Slider;
