import { getServerSideSitemap } from "next-sitemap";
import { getSections } from "lib/content";
import { GetServerSideProps } from "next";

export default function Sitemap() {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const chapters = getSections().flatMap((section) => section.chapters);

  return getServerSideSitemap(
    ctx,
    chapters.map((chapter) => ({
      loc: `${process.env.BASE_URL}/${chapter.id}`,
      lastmod: new Date(chapter.last_edited_time).toISOString(),
    }))
  );
};
