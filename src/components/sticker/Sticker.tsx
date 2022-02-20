import { Element } from "fpl-api";
import React, { useState } from "react";
import { useStore } from "../../stores/ZustandStore";
import * as Styled from "./Sticker.styled";
import { StickerRarity } from "./StickerRarity";

interface ISticker {
  rarity: {
    index: number;
    rarity: string;
    color: string;
  };
  randPlayer: Element;
}

export const Sticker = ({ rarity, randPlayer }: ISticker) => {
  const bootstrap = useStore((state) => state.bootstrap);

  const thisTeam = bootstrap?.teams?.find(
    (team) => team.id === randPlayer?.team
  )?.code;

  const player = {
    webName: randPlayer?.web_name,
    name: randPlayer?.first_name + randPlayer?.second_name,
    image: `https://resources.premierleague.com/premierleague/photos/players/110x140/p${randPlayer?.code}.png`,
    position: randPlayer?.element_type,
    team: `https://resources.premierleague.com/premierleague/badges/t${thisTeam}.svg`,
  };

  const [rotation, setRotation] = useState({ y: 0, x: 0 });

  const getPosition = (type: number) => {
    if (type === 2) {
      return "Defender";
    }
    if (type === 3) {
      return "Midfielder";
    }
    if (type === 4) {
      return "Forward";
    }
    return "Goalkeeper";
  };
  console.log(rotation.x);

  const revertRotation = () => {
    setRotation({ y: 0, x: 0 });
  };

  const rotVal = 1;
  return (
    <StickerRarity rotation={rotation} rarity={rarity.rarity}>
      <Styled.MouseAriaContainer>
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: rotVal, x: -rotVal * 0.8 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: 0, x: -rotVal * 0.8 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: -rotVal, x: -rotVal * 0.8 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: rotVal, x: 0 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: 0, x: 0 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: -rotVal, x: 0 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: rotVal, x: rotVal * 0.8 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: 0, x: rotVal * 0.8 });
          }}
          onMouseLeave={revertRotation}
        />
        <Styled.MouseAria
          onMouseEnter={() => {
            setRotation({ y: -rotVal, x: rotVal * 0.8 });
          }}
          onMouseLeave={revertRotation}
        />
      </Styled.MouseAriaContainer>
      <Styled.Sticker>
        <Styled.SuperSizeWrapper>
          <Styled.SuperSizePlayerName>{player.name}</Styled.SuperSizePlayerName>
        </Styled.SuperSizeWrapper>
        <Styled.PlayerImage image={player.image} />
        <Styled.TeamIconWrapper>
          <Styled.TeamIcon image={player.team}></Styled.TeamIcon>
        </Styled.TeamIconWrapper>
        <Styled.StickerContent>
          <Styled.Banner>
            <Styled.TitlesWrapper>
              <Styled.PlayerName>{player.webName}</Styled.PlayerName>
              <Styled.PlayerRole>
                {getPosition(player.position)}
              </Styled.PlayerRole>
              <Styled.PlayerRole>{rarity.rarity}</Styled.PlayerRole>
            </Styled.TitlesWrapper>
            <Styled.IconsWrapper></Styled.IconsWrapper>
          </Styled.Banner>
        </Styled.StickerContent>
      </Styled.Sticker>
    </StickerRarity>
  );
};
