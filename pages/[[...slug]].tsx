import { getSections, fetchRecordMap } from "lib/notion";
import { GetStaticProps } from "next";
import { Section } from "types/content";
import { ExtendedRecordMap } from "notion-types";
import Layout from "../components/Layout/index";
import { createContext, useMemo } from "react";
import Head from "next/head";
import { getPageTitle } from "notion-utils";
import config from "config/config.json";

interface Props {
  pageID: string;
  sections: Section[];
  recordMap: ExtendedRecordMap;
}

interface PageContextData extends Props {
  currentSection?: Section;
}

export const PageContext = createContext<PageContextData>(null as any);

export default function Page(props: Props) {
  const { pageID, sections, recordMap } = props;

  const currentSection = useMemo(() => {
    if (!sections) return undefined;
    return sections.find((section) => {
      return (
        section.chapters.findIndex((chapter) => chapter.id === pageID) !== -1
      );
    });
  }, [props]);

  if (sections) {
    sections.sort((a, b) => a.index - b.index);
    sections.forEach((section) => {
      section.chapters.sort((a, b) => a.index - b.index);
    });
  }

  let pageTitle = "";
  if (recordMap) {
    pageTitle = getPageTitle(recordMap);
  }

  return (
    <PageContext.Provider value={{ ...props, currentSection }}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Layout />
    </PageContext.Provider>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
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

  const [sectionsReq, recordMapReq] = await Promise.allSettled([
    getSections(),
    fetchRecordMap(pageID),
  ]);

  const sections = isRejected(sectionsReq) ? [] : sectionsReq.value;
  const recordMap = isRejected(recordMapReq) ? null : recordMapReq.value;

  return {
    props: {
      pageID: pageID || "index",
      sections: sections,
      recordMap: recordMap,
    },
    revalidate: 30,
  };
};
