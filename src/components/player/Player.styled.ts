import styled from "styled-components";

export const Player = styled.div<{
  image?: string;
  imageSide?: string;
  infoSide?: string;
  size?: string;
}>`
  background: var(--primary) url(${(props) => props.image}) no-repeat;
  background-position: ${(props) =>
    props.imageSide === "left" ? "8px 100%" : "calc(100% - 8px) 100%"};
  background-size: auto 90%;
  position: relative;
  align-self: center;
  font-family: "Arial";
  border-radius: 4px;

  width: ${(props) => (props.size === "S" ? "" : "90vw")};
  max-width: 400px;
  height: ${(props) =>
    props.size === "L" ? "250px" : props.size === "M" ? "180px" : "75px"};

  display: flex;
  flex-flow: row nowrap;

  justify-content: flex-start;
  margin: ${(props) => (props.size === "S" ? "4px" : "8px")} 0px;

  ${(props) =>
    props.size === "S" &&
    `
		background-color: transparent;
		height: auto;

		> div {
			margin: 0;
		}
		`}
`;

export const Reason = styled.a`
  height: 24px;
  padding: 4px;
  margin: 0;
  z-index: 2;
  position: relative;
  bottom: 0;
  left: 0;
  background-color: white;
  text-align: center;
`;

export const SVG = styled.div<{ url: string }>`
  background-color: white;
  width: 40px;
  height: 10px;
  mask: url(${(props) => props.url}) no-repeat center / contain;
`;

export const PlayerName = styled.div<{ imageSide?: string; size?: string }>`
  height: 100%;
  align-self: flex-end;
  backdrop-filter: blur(10px);
  background-color: rgba(128, 0, 128, 0.25);
  border-radius: 8px;
  border: 2px solid white;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: auto;
  margin: 12px;
  padding: 8px 12px;
  position: relative;
  transition: background-color 0.1s ease;
  height: auto;

  ${(props) => props.size !== "S" && "max-width: 50%;"}

  > div {
    transition: margin-right 0.2s ease;
  }

  :hover {
    background-color: var(--primary);
  }
`;

export const TotalPoints = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: inherit;
  width: 40px;
  > div {
    height: 16px;
    background-color: var(--secondary);
  }

  > p {
    color: white;
    padding: 0;
    margin: 0;
  }
`;

export const Name = styled.div`
  color: white;
  font-size: 1.1rem;
  margin: 0;
  overflow: hidden;
  padding: 0;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const ScoreInfo = styled.div<{ imageSide?: string }>`
  padding: 40px 12px;
  display: flex;
  flex-flow: column nowrap;
  font-size: 0.8rem;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  order: ${(props) => (props.imageSide === "left" ? 1000 : -1)};
  width: 100%;
  > p {
    ${(props) =>
      props.imageSide === "left"
        ? "margin-left : auto;"
        : "margin-right : auto;"};
  }
`;

export const Score = styled.p<{ size?: string; colorOption: string }>`
  display: inline-block;
  border: 1px solid;
  border-color: ${(props) => props.colorOption};
  background-color: var(--primary);
  color: var(--primary);
  text-transform: capitalize;
  font-size: 0.8rem;
  text-align: center;
  color: white;
  border-radius: 50px;
  margin: 0;
  margin-bottom: 4px;
  font-weight: 900;
  padding: 4px 8px;
  padding-right: 0;

  span {
    width: 32px;
    padding: 4px 12px;
    border-radius: 0 50px 50px 0;
    background-color: ${(props) => props.colorOption};
    margin-left: 8px;
    color: black;
  }
`;
