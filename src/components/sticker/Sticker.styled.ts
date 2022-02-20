import styled from "styled-components";

export const StickerWrapper = styled.div`
  display: flex;
  position: relative;

  transition: transform 0.8s cubic-bezier(0, 0.55, 0.45, 1);

  * {
    transition: all 0.8s cubic-bezier(0, 0.55, 0.45, 1);
  }
`;

export const Sticker = styled.div`
  align-items: flex-start;
  aspect-ratio: 0.7;
  background: var(--bgColor);
  border-radius: 0.25em;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1rem;
  justify-content: flex-start;
  width: 10em;
  height: 14.5em;
  max-width: 10em;
  max-height: 14.5em;
  padding: 1em 0.66em;
  position: relative;
  overflow: hidden;
  z-index: -3;
  box-shadow: inset 0 0 0 0.15em var(--edgeColor),
    inset 0 0 0 0.3em var(--borderColor), 0 0 1em 0.2em rgba(0, 0, 0, 0.3); ;
`;

export const StickerContent = styled.div`
  transform: rotateZ(0.006turn);
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -2;
  pointer-events: none;
`;

export const PlayerImage = styled.div<{ image: string }>`
  --image: ${({ image }) => `url('${image}')`};
  transform: rotateZ(0.006turn);
  position: absolute;
  top: -0.3em;
  right: -0.3em;
  left: -0.3em;
  bottom: -0.3em;
  background-image: var(--image);
  background-repeat: no-repeat;
  background-origin: border-box;
  background-clip: border-box;
  background-position: 1.66em calc(100% + 1.3em);
  background-size: 110%;
  filter: grayscale(50%) contrast(140%);
  z-index: -1;
  pointer-events: none;
  mix-blend-mode: var(--imageBlend);
`;

export const Banner = styled.div`
  width: 100%;
  min-height: 2em;
  display: flex;
  pointer-events: none;
`;

export const TitlesWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  gap: 0.1em;
  pointer-events: none;
  * {
    color: var(--textColor);
  }
`;

export const IconsWrapper = styled.div`
  width: 20%;
  pointer-events: none;
`;

export const TeamIconWrapper = styled.div`
  aspect-ratio: 1;
  bottom: 1em;
  left: 1em;
  position: absolute;
  width: 2em;
  z-index: -1;
  filter: drop-shadow(0 0 0.4em rgba(0, 0, 0, 0.3));
  pointer-events: none;
`;

export const TeamIcon = styled.div<{ image: string }>`
  --team: ${({ image }) => `url('${image}')`};
  background-image: var(--team);
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(50%);
  pointer-events: none;
`;

export const PlayerName = styled.h3`
  font-size: 1.3em;
  line-height: 80%;
  font-family: "Nekolina";
  margin: 0;
  pointer-events: none;
`;

export const SuperSizeWrapper = styled.div`
  cursor: pointer;
  position: absolute;

  top: -5em;
  left: -5em;
  right: -5em;
  bottom: -5em;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  transform: translateX(var(--tX)) translateY(var(--tY));
`;

export const SuperSizePlayerName = styled(PlayerName)`
  /* color: var(--rarity); */
  background: var(--effectColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: blur(0.1em);
  font-size: 10em;
  line-height: 80%;
  max-width: 100%;
  mix-blend-mode: screen;
  opacity: 0.66;
  text-align: center;
  text-transform: uppercase;
  word-wrap: break-word;
`;

export const PlayerRole = styled.h4`
  font-size: 0.8em;
  line-height: 90%;
  font-family: "Nekolina";
  margin: 0;
  opacity: 0.4;
`;

export const MouseAriaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const MouseAria = styled.div`
  width: calc(100% / 3);
  height: calc(100% / 3);
  /* border: 1px solid black; */
`;
