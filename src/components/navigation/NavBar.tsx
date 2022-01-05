import React, { useEffect } from "react";
import Link from "next/link";

import * as Styled from "./NavBar.styled";
import WeekPicker from "./WeekPicker";
import { useStore } from "../../stores/ZustandStore";
import { Button, ConfigProvider } from "antd";
import { useRouter } from "next/router";

const NavBar = () => {
  const setMainColor = useStore((state) => state.setMainColor);
  const mainColor = useStore((state) => state.mainColor);
  const setSecondaryColor = useStore((state) => state.setSecondaryColor);
  const secondaryColor = useStore((state) => state.secondaryColor);

  const router = useRouter();

  const liveDetails = useStore((state) => state.liveDetails);

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: mainColor,
        infoColor: secondaryColor,
      },
    });
  }, [mainColor, secondaryColor]);

  return (
    <Styled.NavBar>
      <Styled.NavContainer>
        <Button
          onClick={() => {
            router.push("/");
          }}
          shape="round"
        >
          <img
            style={{ width: 60, height: "auto" }}
            src="images/PRTRT.svg"
            alt=""
          />
        </Button>

        <Button
          onClick={() => {
            router.push("/stats");
          }}
          shape="round"
        >
          <p style={{ fontWeight: 900 }}>Stats</p>
        </Button>

        {/* <div
          style={{ width: 100, height: 50, mask: "url(images/PRTRT.svg)", backgroundColor: "white"}}
        ></div> */}
        <WeekPicker />
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
