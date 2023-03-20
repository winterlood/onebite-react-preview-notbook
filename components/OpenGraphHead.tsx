import React from "react";
import Head from "next/head";
import thumbnail from "public/thumbnail.png";
import config from "config/config.json";

interface Props {
  title?: string;
  thumbnail?: string;
  description?: string;
  url?: string;
}

const OpenGraphHead = (props: Props) => {
  const image = props.thumbnail || process.env.BASE_URL + thumbnail.src;
  const description = props.description || config.description;
  const title = props.title
    ? `${props.title} - ${config.site}`
    : `${config.site}`;

  const openGraphObj: {
    og: { [k: string]: string };
    twitter: { [k: string]: string };
  } = {
    og: {
      title,
      image,
      description,
      type: "website",
      site_name: config.site,
      locale: "ko",
    },
    twitter: {
      card: "summary",
      title,
      image,
      description,
      site: process.env.BASE_URL as string,
    },
  };

  return (
    <Head>
      <title>{openGraphObj.og.title}</title>
      {Object.keys(openGraphObj.og).map((it) => {
        const content = openGraphObj.og[it];
        return (
          <meta key={`meta_og_${it}`} property={`og:${it}`} content={content} />
        );
      })}
      {Object.keys(openGraphObj.twitter).map((it) => {
        const content = openGraphObj.twitter[it];
        return (
          <meta
            key={`meta_twitter_${it}`}
            property={`twitter:${it}`}
            content={content}
          />
        );
      })}
    </Head>
  );
};

export default OpenGraphHead;
