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
          <Styled.SubWeek index={index} current={current} calcStart={calcStart}>
            <p>{index + 1}</p>
          </Styled.SubWeek>
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
