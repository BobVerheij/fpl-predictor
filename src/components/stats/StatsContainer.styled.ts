import { Card } from "antd";
import styled from "styled-components";

export const SCard = styled(Card)`
  cursor: auto;
  pointer-events: all;
  width: 90vw;
  max-width: 400px;
  border-radius: 0.5rem;
  overflow: visible;

  .ant-card-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    overflow: visible;
    position: relative;

    p {
      padding: 0;
      margin: 0 auto;
    }

    ::before,
    ::after {
      display: none;
    }
  }
`;

export const StatsCard = styled.div<{
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
    height: inherit;
    overflow: hidden;
    padding: 1rem 0 0 1rem;
  }

  .ant-drawer-body {
    -webkit-overflow-scrolling: touch;
    display: grid;
    grid-template-columns: repeat(18, 1fr);

    overflow: scroll;
    scroll-snap-type: both mandatory;
  }
`;

export const Stat = styled.p`
  display: inline-block;
  border: 1px solid black;
  width: 5rem;
  height: 100%;
  margin: 0;

  scroll-snap-align: start;
  position: relative;
  text-align: center;
  :hover {
    background: grey;
  }
`;
