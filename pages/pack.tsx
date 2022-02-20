import { Button } from "antd";
import React, { useState } from "react";
import { Sticker } from "../src/components/sticker/Sticker";
import { useStore } from "../src/stores/ZustandStore";

type Option = {
  index: number;
  rarity: string;
  color: string;
  odds: number;
};

const options: Option[] = [
  { index: 0, rarity: "Common", color: "white", odds: 1 },
  { index: 1, rarity: "Uncommon", color: "#cd5832", odds: 0.335 },
  { index: 2, rarity: "Rare", color: "silver", odds: 0.035 },
  { index: 3, rarity: "SuperRare", color: "gold", odds: 0.015 },
  { index: 4, rarity: "UltraRare", color: "skyblue", odds: 0.005 },
];

const Pack = () => {
  const [pack, setPack] = useState<Option[]>();
  const bootstrap = useStore((state) => state.bootstrap);

  const elements = bootstrap?.elements
    ?.filter((element) => element.total_points > 10)
    .sort((a, b) => b.total_points - a.total_points);

  const generateCard = () => {
    const r = Math.random();
    if (r < options.find((option) => option.index === 4).odds) {
      // 0.5% Change in finding a Ultra Rare !!PER CARD!! 1 in 200
      return options.find((option) => option.index === 4);
    }
    if (r < options.find((option) => option.index === 3).odds) {
      // 1% Change in finding a Super Rare !!PER CARD!! 1 in 100
      return options.find((option) => option.index === 3);
    }
    if (r < options.find((option) => option.index === 2).odds) {
      // 2% Change in finding a Rare !!PER CARD!! 1 in 50
      return options.find((option) => option.index === 2);
    }
    if (r < options.find((option) => option.index === 1).odds) {
      // 30% Change in finding a Uncommon !!PER CARD!! 1 in 3 ish
      return options.find((option) => option.index === 1);
    }
    // Definite Common
    return options.find((option) => option.index === 0);
  };

  const generatePack = () => {
    const cards = new Array(9).fill("").map((_) => generateCard());
    console.log(cards);
    setPack(cards);
  };

  return (
    <div style={{ zIndex: 10, marginTop: "5em" }}>
      <Button
        onClick={() => {
          generatePack();
        }}
      >
        Generate Pack
      </Button>
      <div
        style={{
          width: "80vw",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
          padding: "1em",
        }}
      >
        {pack &&
          pack.map((card, index) => (
            <Sticker
              key={index}
              rarity={card}
              randPlayer={
                elements?.[Math.floor(Math.random() * elements.length)]
              }
            ></Sticker>
          ))}
      </div>
    </div>
  );
};

export default Pack;
