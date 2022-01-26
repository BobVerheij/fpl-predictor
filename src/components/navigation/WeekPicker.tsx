import React, { useEffect } from "react";
import * as Styled from "./WeekPicker.styled";
import { useStore } from "../../stores/ZustandStore";
import { uuid } from "uuidv4";

const WeekPicker = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const isLoading = useStore((state) => state.isLoading);
  const setCurrent = useStore((state) => state.setCurrent);

  const gameWeekChange = async (event) => {
    setCurrent(parseInt(event.target.value));
  };

  return (
    <Styled.WeekPicker
      disabled={isLoading}
      onBlur={gameWeekChange}
      onChange={gameWeekChange}
      value={current}
      name="gameweek"
      id="gameweek"
    >
      {bootstrap?.events
        ?.filter((ev) => ev.finished === true || ev.is_current === true)
        .map((ev) => (
          <option key={uuid()} value={ev.id}>
            {ev.name}
          </option>
        ))}
    </Styled.WeekPicker>
  );
};

export default WeekPicker;
