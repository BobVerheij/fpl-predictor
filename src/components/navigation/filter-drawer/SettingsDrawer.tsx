import { CloseCircleFilled } from "@ant-design/icons";
import { Drawer, Select } from "antd";
import React, { useState } from "react";
import FilterBar from "../../filters/FilterBar";
import { RangeSelector } from "../../filters/RangeSelector";
import SortBar from "../../filters/SortBar";
import { ColorPicker } from "../colorpicker/ColorPicker";

interface ISettingsDrawer {
  handleClose: () => void;
  isOpen: boolean;
}

export const SettingsDrawer = ({ handleClose, isOpen }: ISettingsDrawer) => {
  const bodyStyle = {
    backgroundColor: "var(--primary)",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "0.5rem",
  };
  const maskStyle = {
    // backgroundColor: "var(--secondary)",
    // opacity: 0.8,
  };

  const baseStyle = {
    marginTop: "var(--header-height)",
    height: "calc(100vh - var(--header-height))",
  };

  return (
    <Drawer
      style={baseStyle}
      width={"clamp(400px, 75vw, 800px"}
      visible={isOpen}
      maskStyle={maskStyle}
      bodyStyle={bodyStyle}
      headerStyle={{ display: "none" }}
    >
      <FilterBar />
      <SortBar />
      <RangeSelector />
      <ColorPicker />
    </Drawer>
  );
};
