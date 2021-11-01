/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { AppProps } from "next/app";

import { useStore } from "../src/stores/ZustandStore";

import { fetchBootstrap, fetchLive, Live, LiveElement } from "fpl-api";

import { highestOptions } from "../src/constants/HighestOptions";

import GlobalStyle from "../src/styling/global";
import { NewBootstrap } from "../src/types/Types";

const App = ({ Component, pageProps }: AppProps) => {
  const bootstrap = useStore((state) => state.bootstrap);
  const current = useStore((state) => state.current);
  const setCurrent = useStore((state) => state.setCurrent);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setLiveDetails = useStore((state) => state.setLiveDetails);
  const liveDetails = useStore((state) => state.liveDetails);

  const mainColor = useStore((state) => state.mainColor);
  const setMainColor = useStore((state) => state.setMainColor);
  const secondaryColor = useStore((state) => state.secondaryColor);
  const setSecondaryColor = useStore((state) => state.setSecondaryColor);

  const resetAllPlayerHistory = (
    bootstrap: NewBootstrap,
    liveDetails: Live[]
  ) => {
    console.log(bootstrap);
    bootstrap?.elements.map((player) => {
      if (!player.sortStats) {
        player.sortStats = {
          a: 0,
          b: 0,
        };
      }
      if (!player.history) {
        player.history = null;
      }
      player.history = liveDetails?.map((details, index) => {
        const liveElement: LiveElement = details.elements.find(
          (element) => element.id === player.id
        );
        const highest = highestOptions;
        Object.keys(highestOptions).map((stat) => {
          highest[stat] = details.elements.sort(
            (a, b) => b.stats[stat] - a.stats[stat]
          )?.[0]?.stats[stat];
        });
        return {
          ...liveElement,
          gameweek: index,
          highest: highest,
        };
      });
    });
  };

  const reloadBootstrap = async () => {
    const newBootstrap: any = await fetchBootstrap();
    setBootstrap(newBootstrap);
  };

  if (!bootstrap) {
    reloadBootstrap();
    console.log(bootstrap);
  }

  if (!current) {
    setCurrent(bootstrap?.events.find((event) => event.is_current).id);
  }

  if (!liveDetails) {
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
    resetAllPlayerHistory(bootstrap, liveDetails);
  }

  useEffect(() => {
    if (localStorage.getItem("mainColor"))
      setMainColor(localStorage.getItem("mainColor"));
    if (localStorage.getItem("secondaryColor"))
      setSecondaryColor(localStorage.getItem("secondaryColor"));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle mainColor={mainColor} secondaryColor={secondaryColor} />
      <Component {...pageProps} />
    </DndProvider>
  );
};
export default App;
