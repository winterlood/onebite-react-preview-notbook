import { getSections, fetchRecordMap } from "lib/notion";
import { GetStaticProps } from "next";
import { Section } from "types/content";
import { ExtendedRecordMap } from "notion-types";
import Layout from "../components/Layout/index";
import { createContext, useMemo } from "react";
import Head from "next/head";
import { getPageTitle } from "notion-utils";
import config from "config/config.json";
import OpenGraphHead from "components/OpenGraphHead";

interface Props {
  pageID: string;
  sections: Section[];
  recordMap: ExtendedRecordMap;
  pageTitle?: string;
  currentSection?: Section;
}

interface PageContextData extends Props {
  currentSection?: Section;
}

export const PageContext = createContext<PageContextData>(null as any);

export default function Page(props: Props) {
  const { pageID, sections, pageTitle, currentSection } = props;

  if (sections) {
    sections.sort((a, b) => a.index - b.index);
    sections.forEach((section) => {
      section.chapters.sort((a, b) => a.index - b.index);
    });
  }

  return (
    <PageContext.Provider value={{ ...props, currentSection }}>
      <OpenGraphHead title={pageTitle} />
      <Layout />
    </PageContext.Provider>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

function isRejected<T>(
  req: PromiseSettledResult<T>
): req is PromiseRejectedResult {
  return req.status === "rejected";
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as { slug?: string[] };

  const pageID = Array.isArray(slug) ? slug[0] : config.home_page_id;
  const isContentPage = Array.isArray(slug) && slug.length === 1;

  const [sectionsReq, recordMapReq] = await Promise.allSettled([
    getSections(),
    fetchRecordMap(pageID),
  ]);

  const sections = isRejected(sectionsReq) ? [] : sectionsReq.value;
  const recordMap = isRejected(recordMapReq) ? null : recordMapReq.value;

  let currentSection: Section | null = null;
  if (sections && isContentPage) {
    currentSection =
      sections.find((section) => {
        return (
          section.chapters.findIndex((chapter) => chapter.id === pageID) !== -1
        );
      }) || null;
  }

  let chapterTitle: string | undefined;
  if (recordMap) {
    chapterTitle = getPageTitle(recordMap);
  }

  let pageTitle: string | null = null;
  if (chapterTitle) {
    pageTitle = `${chapterTitle} - ${config.site}`;
  }

  if (currentSection) {
    pageTitle = `${chapterTitle} - ${currentSection.title}`;
  }

  return {
    props: {
      pageID: pageID || "index",
      pageTitle: pageTitle,
      currentSection: currentSection,
      sections: sections,
      recordMap: recordMap,
    },
    revalidate: 30,
  };
};
