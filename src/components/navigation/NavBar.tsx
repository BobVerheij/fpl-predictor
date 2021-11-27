import React from "react";
import Link from "next/link";

import * as Styled from "./NavBar.styled";
import WeekPicker from "./WeekPicker";
import { useStore } from "../../stores/ZustandStore";

const NavBar = () => {
  const setMainColor = useStore((state) => state.setMainColor);
  const mainColor = useStore((state) => state.mainColor);
  const setSecondaryColor = useStore((state) => state.setSecondaryColor);
  const secondaryColor = useStore((state) => state.secondaryColor);

  return (
    <Styled.NavBar>
      <Styled.NavContainer>
        <Link href="/">
          <h3>FPL Predictor</h3>
        </Link>
        <WeekPicker />
        <Link href="/stats">
          <a> Stats </a>
        </Link>
        <Styled.ColorPickerWrapper>
          <Styled.ColorPicker
            type="color"
            defaultValue={mainColor}
            onBlur={(event) => {
              setMainColor(event.target.value);
              localStorage.setItem("mainColor", event.target.value);
            }}
          />
          <Styled.ColorPicker
            type="color"
            defaultValue={secondaryColor}
            onBlur={(event) => {
              setSecondaryColor(event.target.value);
              localStorage.setItem("secondaryColor", event.target.value);
            }}
          />
        </Styled.ColorPickerWrapper>
      </Styled.NavContainer>
    </Styled.NavBar>
  );
};
export default NavBar;
