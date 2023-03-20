import { getServerSideSitemap } from "next-sitemap";
import { fetchAllPages } from "../lib/notion";
import { ContentPage } from "types/notion";
import { GetServerSideProps } from "next";

export default function Sitemap() {}

const createSitemap = (pages: ContentPage[]) =>
  pages.map((page) => ({
    loc: `${process.env.BASE_URL}/${page.id}`,
    lastmod: new Date(page.last_edited_time).toISOString(),
  }));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pages = await fetchAllPages();
  return getServerSideSitemap(ctx, createSitemap(pages || []));
};
