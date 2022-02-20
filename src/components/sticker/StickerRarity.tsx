import React, { ReactNode } from "react";
import * as Styled from "./StickerRarity.styled";

interface IStickerRarity {
  rotation?: { x: number; y: number };
  rarity: string;
  children: ReactNode;
}

export const StickerRarity = ({
  rotation,
  rarity,
  children,
}: IStickerRarity) => {
  return (
    <>
      {rarity === "Common" && (
        <Styled.CommonSticker rotation={rotation}>
          {children}
        </Styled.CommonSticker>
      )}
      {rarity === "Uncommon" && (
        <Styled.UncommonSticker rotation={rotation}>
          {children}
        </Styled.UncommonSticker>
      )}
      {rarity === "Rare" && (
        <Styled.RareSticker rotation={rotation}>{children}</Styled.RareSticker>
      )}
      {rarity === "SuperRare" && (
        <Styled.SuperRareSticker rotation={rotation}>
          {children}
        </Styled.SuperRareSticker>
      )}
      {rarity === "UltraRare" && (
        <Styled.UltraRareSticker rotation={rotation}>
          {children}
        </Styled.UltraRareSticker>
      )}
    </>
  );
};
