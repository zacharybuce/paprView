import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import NextNprogress from "nextjs-progressbar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="icon" href="/favicon.png"></link>
        <title>
          paprView - Summaries that are concise and easy to understand
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Box sx={{ position: "relative", pb: "20vh", minHeight: "100vh" }}>
            <Navbar></Navbar>
            <NextNprogress color="#EEB559" height={5} />
            <Box sx={{ mt: "64px" }}>
              <Component {...pageProps} />
            </Box>
          </Box>
          <Footer />
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
