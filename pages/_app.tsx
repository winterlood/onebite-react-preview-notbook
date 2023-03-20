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
import { Analytics } from "@vercel/analytics/react";
import usePageviewEffect from "hooks/usePageViewEffect";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  useNProgressEffect();
  usePageviewEffect();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
      <Analytics />
    </CacheProvider>
  );
}
