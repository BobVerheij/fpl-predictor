import React from "react";
import Link from "next/link";

import * as Styled from "./NavBar.styled";
import WeekPicker from "./WeekPicker";

const NavBar = () => {
  return (
    <Styled.NavBar>
      <Link href="/">
        <h3>FPL Predictor</h3>
      </Link>
      <WeekPicker />
      <Link href="/stats">
        <a> Stats </a>
      </Link>
    </Styled.NavBar>
  );
};
export default NavBar;
