import styled from "styled-components";
import { Card } from "antd";

export const SCard = styled(Card)`
  cursor: auto;
  pointer-events: all;
  width: 90vw;
  max-width: 400px;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const PlayerCard = styled.div<{
  active: boolean;
  photo: string;
  open: boolean;
}>`
  background-image: url(${({ photo }) => photo ?? ""});
  background-position: ${({ active }) => (active ? "5%" : "90%")} 100%;
  background-repeat: no-repeat;
  background-size: auto ${({ active }) => (active ? "95%" : "90%")};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  box-shadow: inset 0 -0.5rem 2rem 0 rgba(0, 0, 0, 0.3);
  cursor: auto;
  height: ${({ open }) => (open ? "200px" : "0px")};
  overflow: hidden;
  padding: ${({ open }) => (open ? "1.5rem" : "0px")};
  position: relative;
  transition: all ${({ active }) => (active ? "0s ease-in" : "0.4s ease-out")};
  transition: height ${({ open }) => (!open ? "0s" : "0.3s")} ease;

  .ant-drawer-mask {
    background: none !important;
  }

  .ant-drawer-content {
    transition: all 0.2s ease;
    position: relative;
    margin-left: auto;
    overflow: visible;

    ::before {
      display: none;
      /* display: ${({ active }) => (active ? "flex" : "none")}; */
      content: url("");
      height: 2rem;
      width: 2rem;
      position: absolute;
      border-radius: 100%;
      left: -3rem;
      top: 75%;
      background-color: var(--secondary);
      mix-blend-mode: difference;
    }
  }
`;

export const PlayerBasics = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  height: 100%;

  h1 {
    width: 66%;
    line-height: 2rem;
    color: var(--primary80);
    b {
      color: var(--primary);
    }
  }

  p {
    text-transform: capitalize;
    background-color: var(--secondary);
    border-radius: 1rem 0 0 1rem;
    height: 1.5rem;
    font-size: 0.7rem;
    line-height: 1.4rem;
    justify-self: flex-end;
    margin-top: auto;
    margin-left: auto;
    align-self: flex-end;
    padding-left: 1rem;
    padding-right: 4rem;
    font-weight: 700;
    ::after {
      content: "";
      position: absolute;
      height: 1.5rem;
      width: 100%;
      background-color: var(--secondary);
      right: -100%;
    }
  }
`;

export const Gameweeks = styled.div`
  position: absolute;
  bottom: 0;
  left: -5px;

  .ant-timeline-item-tail {
    border-left: 2px dotted grey;
  }

  .ant-timeline-item-head {
    background: none;
  }
`;
