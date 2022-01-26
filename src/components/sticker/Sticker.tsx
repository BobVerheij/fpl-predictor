import React from "react";
import * as Styled from "./Sticker.styled";

export const Sticker = () => {
  const player = {
    name: "Mo Salah",
    position: "Midfielder",
  };

  return (
    <Styled.Sticker>
      <Styled.SuperSizeWrapper>
        <Styled.SuperSizePlayerName>{player.name}</Styled.SuperSizePlayerName>
      </Styled.SuperSizeWrapper>
      <Styled.PlayerImage />
      <Styled.TeamIconWrapper>
        <Styled.TeamIcon></Styled.TeamIcon>
      </Styled.TeamIconWrapper>
      <Styled.StickerContent>
        <Styled.Banner>
          <Styled.TitlesWrapper>
            <Styled.PlayerName>{player.name}</Styled.PlayerName>
            <Styled.PlayerRole>{player.position}</Styled.PlayerRole>
          </Styled.TitlesWrapper>
          <Styled.IconsWrapper></Styled.IconsWrapper>
        </Styled.Banner>
      </Styled.StickerContent>
    </Styled.Sticker>
  );
};
