/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Document from "next/document";
import Head from "next/head";
import { ServerStyleSheet } from "styled-components";
import NavBar from "../src/components/navigation/NavBar";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <Head>
                  <title>FPL Predictions</title>
                </Head>
                <App {...props} />
              </>
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
