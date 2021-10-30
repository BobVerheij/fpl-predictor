/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { AppProps } from "next/app";

import { useStore } from "../src/stores/ZustandStore";
import { useEffect } from "react";
import { fetchBootstrap, fetchLive } from "fpl-api";

import GlobalStyle from "../src/styling/global";

const App = ({ Component, pageProps }: AppProps) => {
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

  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle />
      <Component {...pageProps} />
    </DndProvider>
  );
};
export default App;
