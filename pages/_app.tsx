import "styles/globals.css";
import "styles/pallette.css";
import "styles/notion.css";

import * as React from "react";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import useNProgressEffect from "hooks/useNProgressEffect";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Head from "next/head";

export interface MyAppProps extends AppProps {}

export default function MyApp(props: MyAppProps) {
  useNProgressEffect();

  const { Component, pageProps } = props;
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GA_TRACKING_ID}');
      `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_TRACKING_ID}');
        `}
      </Script>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
