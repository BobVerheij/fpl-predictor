/* eslint-disable react/jsx-props-no-spreading */

import "antd/dist/antd.variable.min.css";
import { ConfigProvider } from "antd";
import { DndProvider } from "react-dnd";
import {
  fetchBootstrap,
  fetchFixtures,
  fetchLive,
} from "../src/services/fetchApiData";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NewBootstrap } from "../src/types/Types";
import { useStore } from "../src/stores/ZustandStore";
import GlobalStyle from "../src/styling/global";
import LoadingAnimation from "../src/components/loading/LoadingAnimation";
import NavBar from "../src/components/navigation/NavBar";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const [isStylingCorrect, setIsStylingCorrect] = useState(false);

  const bootstrap = useStore((state) => state.bootstrap);
  const setCurrent = useStore((state) => state.setCurrent);
  const isLoading = useStore((state) => state.isLoading);
  const liveDetails = useStore((state) => state.liveDetails);
  const mainColor = useStore((state) => state.mainColor);
  const secondaryColor = useStore((state) => state.secondaryColor);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setLiveDetails = useStore((state) => state.setLiveDetails);
  const setMainColor = useStore((state) => state.setMainColor);
  const setRange = useStore((state) => state.setRange);
  const setSecondaryColor = useStore((state) => state.setSecondaryColor);
  const setFixtures = useStore((state) => state.setFixtures);

  const reloadBootstrap = async () => {
    const newBootstrap: NewBootstrap = await fetchBootstrap();
    setBootstrap(newBootstrap);
  };

  const reloadLiveDetails = async () => {
    setIsLoading(true);
    let newLiveDetails = [];
    for (
      let i = 1;
      i < bootstrap?.events?.find((event) => event.is_next).id;
      i++
    ) {
      newLiveDetails = [...newLiveDetails, await fetchLive(i)];
    }
    setLiveDetails(newLiveDetails);
    setIsLoading(false);
  };

  const reloadFixtures = async () => {
    const fixtures = await fetchFixtures();
    setFixtures(fixtures);
  };

  useEffect(() => {
    setCurrent(liveDetails?.length);
    setRange([liveDetails?.length - 1, liveDetails?.length - 1]);
  }, [liveDetails]);

  useEffect(() => {
    (async () => {
      await reloadBootstrap();
    })();

    if (localStorage.getItem("mainColor"))
      setMainColor(localStorage.getItem("mainColor"));
    if (localStorage.getItem("secondaryColor"))
      setSecondaryColor(localStorage.getItem("secondaryColor"));

    ConfigProvider.config({
      theme: {
        primaryColor: mainColor,
        infoColor: secondaryColor,
      },
    });
  }, []);

  useEffect(() => {
    (async () => {
      await reloadLiveDetails();
    })();
  }, [bootstrap]);

  useEffect(() => {
    (async () => {
      await reloadFixtures();
    })();
  }, [bootstrap]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    setIsStylingCorrect(true);
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      <GlobalStyle mainColor={mainColor} secondaryColor={secondaryColor} />

      {isStylingCorrect && (
        <>
          <NavBar />
          {isLoading && <LoadingAnimation />}
          {!isLoading && <Component {...pageProps} />}
        </>
      )}
    </DndProvider>
  );
};
export default App;
