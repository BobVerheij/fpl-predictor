import React from "react";
import * as Styled from "./Slider.styled";

const Slider = ({ onChange, current, calcStart }) => {
  const array = Array.apply(
    null,
    Array(current ? current : 0).map((i) => i)
  );

  return (
    <Styled.Slider count={current}>
      <div>
        {array.map((item, index) => (
          <div
            style={{
              width: `${100 / current}%`,
              borderTop: `${
                index + 1 > calcStart ? "2px solid var(--primary)" : ""
              }`,
              borderBottom: `${
                index + 1 > calcStart ? "2px solid var(--primary)" : ""
              }`,
              color: `${
                index + 1 === calcStart || index + 1 === current ? "white" : ""
              }`,
              borderTopRightRadius: `${index + 1 === current ? "10px" : ""}`,
              borderBottomRightRadius: `${index + 1 === current ? "10px" : ""}`,
              borderTopLeftRadius: `${index + 1 === calcStart ? "10px" : ""}`,
              borderBottomLeftRadius: `${
                index + 1 === calcStart ? "10px" : ""
              }`,

              backgroundColor: `${
                index + 1 === calcStart || index + 1 === current
                  ? "var(--primary)"
                  : index % 2 === 0
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
        onChange={(event) => onChange(parseInt(event.target.value))}
        type="range"
        min="1"
        max={current}
        defaultValue="1"
      />
    </Styled.Slider>
  );
};
export default Slider;
