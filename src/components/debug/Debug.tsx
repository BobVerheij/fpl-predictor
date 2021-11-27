import React, { ReactElement } from "react";
import * as Styled from "./Debug.styled";

interface DebugProps {
  children: ReactElement;
}

const Debug = ({ children }: DebugProps) => {
  return <Styled.Debug>{children}</Styled.Debug>;
};

export default Debug;
