/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { AppProps } from "next/app";

import GlobalStyle from "../src/styling/global";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle />
      <Component {...pageProps} />
    </DndProvider>
  );
};
export default App;
