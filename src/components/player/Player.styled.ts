import styled from "styled-components";

export const Player = styled.div<{
  image?: string;
  imageSide?: string;
  infoSide?: string;
  size?: string;
}>`
  background: url(${(props) => props.image}) no-repeat, none;

  background-position: ${(props) =>
      props.imageSide === "left" ? "8px 100%" : "calc(100% - 8px) 100%"},
    left top;
  background-size: auto 90%, auto;

  perspective-origin: left;
  transform: perspective(40em) rotateX(-2deg);

  position: relative;
  align-self: center;
  font-family: "Arial";
  border-radius: 1em;
  backdrop-filter: blur(20px);
  gap: 12px;
  padding: 0 12px;

  width: ${(props) => (props.size === "S" ? "" : "90vw")};
  max-width: 400px;
  height: ${(props) =>
    props.size === "L" ? "250px" : props.size === "M" ? "180px" : "75px"};

  display: flex;
  flex-flow: row nowrap;

  justify-content: flex-start;
  margin: 0.5em 0;

  box-shadow: 0.3em 0.3em 0.4em rgba(0, 0, 0, 0.1),
    -0.3em -0.3em 0.4em rgba(255, 255, 255, 0.05),
    inset 0 0 1em rgba(255, 255, 255, 0.05);

  ${(props) =>
    props.size === "S" &&
    `
		background: none;
		height: auto;
		margin-right: 1em;
		padding: 0;

		> div {
			margin: 0;
		}
		box-shadow: none;
		`};
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
  font-size: inherit;
  width: 2em;
  height: 1em;
  mask: url(${(props) => props.url}) no-repeat center / contain;
`;

export const PlayerName = styled.div<{ imageSide?: string; size?: string }>`
  align-items: center;
  align-self: center;
  backdrop-filter: blur(10px);
  background-color: var(--primary80);
  border-radius: 8px;
  border: 2px solid white;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  font-size: 0.8rem;
  height: auto;
  margin: auto 0 1em 0;
  padding: 8px 12px;
  position: relative;

  width: 100%;

  :hover {
    background-color: var(--primary);
  }
`;

export const TotalPoints = styled.div`
  color: white;
  font-weight: 900;
  padding: 0 4px;
`;

export const Name = styled.div`
  color: white;
  font-size: 0.9rem;
  margin: 0;
  overflow: hidden;
  padding: 0;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const ScoreInfo = styled.div<{ imageSide?: string }>`
  padding: 40px 0 8px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: ${(props) =>
    props.imageSide === "right" ? "flex-start" : "flex-end"};
  font-size: 0.8rem;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  order: ${(props) => (props.imageSide === "left" ? 1000 : -1)};
  width: 100%;

  /* > p {
    ${(props) =>
    props.imageSide === "left"
      ? "margin-left : auto;"
      : "margin-right : auto;"};
  } */
  a {
    color: white;
    padding: 8px;
    text-transform: uppercase;
    font-weight: 900;
    text-decoration: none;
  }
`;

export const Score = styled.div<{ size?: string; colorOption: string }>`
  /* border: 1px solid; */

  box-shadow: inset 0 0 0 2px ${(props) => props.colorOption};
  border-radius: 50px;
  display: flex;
  flex: row nowrap;
  justify-content: flex-end;
  font-size: 0.7rem;
  margin: 0 0 0.4em 0;
  max-width: 100%;

  p {
    text-align: center;
    color: white;
    font-weight: 900;
    margin: 0;
    min-width: 2.5em;
    padding: 0.6em 0em;
    text-align: center;
    text-transform: capitalize;
  }

  p:first-of-type {
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0.6em 1em;
  }

  p:last-of-type {
    font-weight: 900;
    border-radius: 0 50px 50px 0;
    background-color: ${(props) => props.colorOption};
    color: ${(props) =>
      props.colorOption === "rgb(137, 44, 226)" ? "white" : "black"};
  }
`;
