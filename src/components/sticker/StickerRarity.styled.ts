import styled from "styled-components";
import { css } from "styled-components";
import { StickerWrapper } from "./Sticker.styled";

const tString = css<{ rotation }>`
  transform: ${({ rotation }) =>
      !!rotation
        ? `rotate3d(${rotation.x}, ${rotation.y}, 0, 10deg)`
        : `rotate3d(0, 0, 0, 10deg)`}
    perspective(2em);
  --tX: ${({ rotation }) =>
    rotation.y !== 0 ? (rotation.y > 0 ? "1em" : "-1em") : "0em"};
  --tY: ${({ rotation }) =>
    rotation.x !== 0 ? (rotation.x > 0 ? "-2em" : "2em") : "0em"};
`;

export const CommonSticker = styled(StickerWrapper)<{
  rotation?: { x: number; y: number };
}>`
  --edgeColor: white;
  --bgColor: white;
  --borderColor: black;
  --effectColor: white;
  --imageBlend: normal;
  --textColor: black;
  ${tString}
`;

export const UncommonSticker = styled(StickerWrapper)<{
  rotation?: { x: number; y: number };
}>`
  --edgeColor: white;
  --bgColor: linear-gradient(180deg, white 0%, #cd7f32 400%);
  --borderColor: black;
  --effectColor: cornsilk;
  --imageBlend: luminosity;
  --textColor: black;

  ${tString}
`;

export const RareSticker = styled(StickerWrapper)<{
  rotation?: { x: number; y: number };
}>`
  --edgeColor: black;
  --bgColor: linear-gradient(180deg, white -50%, black 100%);
  --borderColor: black;
  --effectColor: cornsilk;
  --imageBlend: luminosity;
  --textColor: cornsilk;

  ${tString}
`;

export const SuperRareSticker = styled(StickerWrapper)<{
  rotation?: { x: number; y: number };
}>`
  --edgeColor: hotpink;
  --bgColor: linear-gradient(180deg, silver 0%, hotpink 100%);
  --borderColor: white;
  --effectColor: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 20%,
    rgba(255, 154, 0, 1) 25%,
    rgba(208, 222, 33, 1) 30%,
    rgba(79, 220, 74, 1) 35%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 45%,
    rgba(28, 127, 238, 1) 50%,
    rgba(95, 21, 242, 1) 55%,
    rgba(186, 12, 248, 1) 60%,
    rgba(251, 7, 217, 1) 65%,
    rgba(255, 0, 0, 1) 70%
  );
  --imageBlend: normal;
  --textColor: white;

  ${tString}
`;

export const UltraRareSticker = styled(StickerWrapper)<{
  rotation?: { x: number; y: number };
}>`
  --edgeColor: gold;
  --borderColor: transparent;
  --bgColor: rgba(255, 255, 255, 0.4);
  --imageBlend: screen;
  --textColor: white;

  --effectColor: linear-gradient(
    90deg,
    black 0%,
    moccasin 20%,
    black 40%,
    moccasin 60%,
    black 80%,
    moccasin 100%
  );

  ${tString}
`;
