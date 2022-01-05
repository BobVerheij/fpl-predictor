import { over } from "lodash";
import styled, { css } from "styled-components";

export const GraphContainer = styled.div<{ photo?: string; overlay?: boolean }>`
  position: relative;
  align-items: center;
  background-color: white;

  border-radius: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  height: 150px;
  justify-content: center;
  width: 90vw;
  max-width: 400px;
  overflow: visible;
  box-shadow: inset 0 -0.2rem 0.5rem 0 rgba(0, 0, 0, 0.4);
  border: 2px solid white;

  ${(props) =>
    props.overlay &&
    css`
      pointer-events: none;
      background-color: transparent;
      position: absolute;
      top: 0;
      box-shadow: none;
      path {
        mix-blend-mode: multiply;
      }
    `}

  ${(props) =>
    props.photo &&
    css`
      background-image: url(${props.photo});
      background-position: 5% 110%;
      background-repeat: no-repeat;
      background-size: auto 90%;
    `}

  ::after,
  ::before {
    content: "";
    z-index: -1;
    position: absolute;
    background: var(--secondary);
    bottom: -2rem;
    height: 2rem;
    width: 1rem;
    box-shadow: inset 0 0.2rem 0.5rem 0 rgba(0, 0, 0, 0.4);
  }

  ::after {
    left: 2rem;
  }
  ::before {
    right: 2rem;
  }
`;
