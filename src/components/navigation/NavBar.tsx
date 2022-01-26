import React, { useEffect, useState } from "react";

import * as Styled from "./NavBar.styled";
import WeekPicker from "./WeekPicker";
import { useStore } from "../../stores/ZustandStore";
import { Button, ConfigProvider } from "antd";
import { useRouter } from "next/router";
import { ColorPicker } from "./colorpicker/ColorPicker";
import { SettingsDrawer } from "./filter-drawer/SettingsDrawer";
import { MenuFoldOutlined, MenuOutlined } from "@ant-design/icons";
import { SearchBar } from "../search/SearchBar";

const NavBar = () => {
  const mainColor = useStore((state) => state.mainColor);
  const secondaryColor = useStore((state) => state.secondaryColor);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

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

        <WeekPicker />

        <Button
          onClick={() => {
            router.push("/stats");
          }}
          shape="round"
        >
          <p style={{ fontWeight: 900 }}>Stats</p>
        </Button>
        <SearchBar />
        <Button
          style={{ marginLeft: "auto" }}
          onClick={handleClose}
          shape="round"
        >
          <MenuOutlined />
        </Button>
        <SettingsDrawer
          handleClose={handleClose}
          isOpen={isOpen}
        ></SettingsDrawer>
      </Styled.NavContainer>
    </Styled.NavBar>
  );
};
export default NavBar;
