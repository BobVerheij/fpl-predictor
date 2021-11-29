/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { AppProps } from "next/app";
import NavBar from "../src/components/navigation/NavBar";

import "antd/dist/antd.variable.min.css";

import { useStore } from "../src/stores/ZustandStore";

import GlobalStyle from "../src/styling/global";

import { ConfigProvider } from "antd";

import { NewBootstrap } from "../src/types/Types";
import { fetchBootstrap, fetchLive } from "../src/services/fetchApiData";

const App = ({ Component, pageProps }: AppProps) => {
  const mainColor = useStore((state) => state.mainColor);
  const secondaryColor = useStore((state) => state.secondaryColor);
  const setBootstrap = useStore((state) => state.setBootstrap);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setLiveDetails = useStore((state) => state.setLiveDetails);
  const setMainColor = useStore((state) => state.setMainColor);
  const setSecondaryColor = useStore((state) => state.setSecondaryColor);

  const reloadBootstrap = async () => {
    const newBootstrap: NewBootstrap = await fetchBootstrap();
    setBootstrap(newBootstrap);
  };

  useEffect(() => {
    console.log("reloads data");
    reloadBootstrap();
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
    ConfigProvider.config({
      theme: {
        primaryColor: mainColor,
        infoColor: secondaryColor,
      },
    });
  }, []);

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: mainColor,
        infoColor: secondaryColor,
      },
    });
  }, [mainColor, secondaryColor]);

  useEffect(() => {
    if (localStorage.getItem("mainColor"))
      setMainColor(localStorage.getItem("mainColor"));
    if (localStorage.getItem("secondaryColor"))
      setSecondaryColor(localStorage.getItem("secondaryColor"));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle mainColor={mainColor} secondaryColor={secondaryColor} />
      <NavBar />
      <Component {...pageProps} />
    </DndProvider>
  );
};
export default App;
