import React from "react";
import * as Styled from "./WeekPicker.styled";
import { useStore } from "../../stores/ZustandStore";

interface WeekPickerProps {
  isLoading: boolean;
  handleChange: (value: number) => void;
}

const WeekPicker = ({ isLoading, handleChange }: WeekPickerProps) => {
  const bootstrap = useStore((state) => state.bootstrap);

  return (
    <Styled.WeekPicker
      disabled={isLoading}
      defaultValue={""}
      onChange={(event) => {
        handleChange(Number(event.target.value));
      }}
      name="gameweek"
      id="gameweek"
    >
      <option value="" disabled>
        Select a Game Week
      </option>
      {bootstrap?.events
        .filter((ev) => ev.finished === true || ev.is_current === true)
        .map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.name}
          </option>
        ))}
    </Styled.WeekPicker>
  );
};

export default WeekPicker;
