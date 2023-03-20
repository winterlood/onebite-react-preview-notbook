import "styles/globals.css";
import "styles/pallette.css";
import "styles/notion.css";

import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "lib/createEmotionCache";
import useNProgressEffect from "hooks/useNProgressEffect";
import thumbnail from "public/thumbnail.png";
import { Analytics } from "@vercel/analytics/react";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  useNProgressEffect();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>한 입 크기로 잘라먹는 리액트</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property={"og:image"} content={thumbnail.src}></meta>
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
      <Analytics />
    </CacheProvider>
  );
}
