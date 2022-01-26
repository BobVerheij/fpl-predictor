import styled from "styled-components";

export const Sticker = styled.div`
  align-items: flex-start;
  aspect-ratio: 0.7;
  background-color: white;
  border-radius: 0.2em;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1.5rem;
  justify-content: flex-start;
  margin-top: 4rem;
  width: 10em;
  padding: 1em 0.66em;
  position: relative;
  overflow: hidden;
  z-index: -3;
  box-shadow: inset 0 0 0 0.1em rgba(255, 255, 255, 1),
    inset 0 0 0 0.2em rgba(0, 0, 0, 1);
`;

export const StickerContent = styled.div`
  transform: rotateZ(0.004turn);
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -2;
`;

export const PlayerImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-image: url("https://resources.premierleague.com/premierleague/photos/players/110x140/p118748.png");
  background-repeat: no-repeat;
  background-origin: border-box;
  background-clip: border-box;
  background-position: 1.66em calc(100% + 1em);
  background-size: 110%;
  filter: grayscale(70%) contrast(140%);
  z-index: -1;
`;

export const Banner = styled.div`
  width: 100%;
  min-height: 2em;
  display: flex;
`;

export const TitlesWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  gap: 0.1em;
`;

export const IconsWrapper = styled.div`
  width: 20%;
`;

export const TeamIconWrapper = styled.div`
  aspect-ratio: 1;
  bottom: 1em;
  left: 0.5em;
  position: absolute;
  width: 3.5em;
  z-index: -1;
  filter: drop-shadow(0 0 0.4em rgba(0, 0, 0, 0.3));
`;

export const TeamIcon = styled.div`
  background-image: url("https://resources.premierleague.com/premierleague/badges/t14.svg");
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(100%);
`;

export const PlayerName = styled.h3`
  font-size: 1.3em;
  line-height: 80%;
  font-family: "Nekolina";
  margin: 0;
`;

export const SuperSizeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuperSizePlayerName = styled(PlayerName)`
  font-size: 10em;
  line-height: 80%;
  text-align: center;
  color: gold;
  color: skyblue;
  color: silver;
  color: rgb(205, 127, 50);
  mix-blend-mode: screen;
  filter: blur(0.066em);
  opacity: 0.8;
`;

export const PlayerRole = styled.h4`
  font-size: 0.8em;
  line-height: 90%;
  font-family: "Nekolina";
  margin: 0;
  opacity: 0.4;
`;
