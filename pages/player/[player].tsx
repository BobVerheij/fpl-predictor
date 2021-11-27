import React, { useEffect, useState } from "react";
import Player from "../../src/components/player/Player";
import { fetchBootstrap, fetchLive } from "../../src/services/fetchApiData";
import { useStore } from "../../src/stores/ZustandStore";

const PlayerPage = ({ id }) => {
  const bootstrap = useStore((state) => state.bootstrap);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setLiveDetails = useStore((state) => state.setLiveDetails);

  const reloadBootstrap = async () => {
    const newBootstrap: any = await fetchBootstrap();
    setBootstrap(newBootstrap);
  };

  if (!bootstrap) {
    reloadBootstrap();
  }

  useEffect(() => {
    const reloadLiveDetails = async () => {
      setIsLoading(true);
      let newLiveDetails = [];
      for (let i = 1; i <= 38; i++) {
        newLiveDetails = [...newLiveDetails, await fetchLive(i)];
      }
      setLiveDetails(newLiveDetails);
      setIsLoading(false);
    };
    reloadLiveDetails();
  }, []);

  return <Player sizing={1} playerID={id} imageSide="left"></Player>;
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
