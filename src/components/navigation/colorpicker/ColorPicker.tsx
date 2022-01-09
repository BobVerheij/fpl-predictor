import React from "react";
import { useStore } from "../../../stores/ZustandStore";

import * as Styled from "../NavBar.styled";

export const ColorPicker = () => {
  const mainColor = useStore((state) => state.mainColor);
  const setMainColor = useStore((state) => state.setMainColor);
  const secondaryColor = useStore((state) => state.secondaryColor);
  const setSecondaryColor = useStore((state) => state.setSecondaryColor);

  return (
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
  );
};
