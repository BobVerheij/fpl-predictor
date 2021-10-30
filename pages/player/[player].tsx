import { fetchBootstrap } from "fpl-api";

import React from "react";
import Player from "../../src/components/player/Player";

const PlayerPage = ({ id }) => {
  return <Player sizing={1} playerID={id} hasPhoto imageSide="left"></Player>;
};

export async function getStaticPaths() {
  const bootstrap = await fetchBootstrap();
  const foundPaths = bootstrap.elements.map((element) => ({
    params: { player: `${element.id}` },
  }));

  return {
    paths: foundPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  return {
    props: {
      id: params.player,
    },
  };
}

export default PlayerPage;
