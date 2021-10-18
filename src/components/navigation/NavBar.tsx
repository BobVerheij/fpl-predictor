import React from "react";
import { useStore } from "../../stores/ZustandStore";

import * as Styled from "./NavBar.styled";
import WeekPicker from "./WeekPicker";

interface NavBarProps {
  gameWeekChange: (value: number) => void;
}

const NavBar = ({ gameWeekChange }: NavBarProps) => {
  const isLoading = useStore((state) => state.isLoading);

  return (
    <Styled.NavBar>
      <h3>FPL Predictor</h3>
      <WeekPicker
        isLoading={isLoading}
        handleChange={gameWeekChange}
      ></WeekPicker>{" "}
    </Styled.NavBar>
  );
};
export default NavBar;
