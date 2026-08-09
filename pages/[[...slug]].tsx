import {
  getAllPageIds,
  getPageContent,
  getSections,
  toDashedUuid,
} from "lib/content";
import { GetStaticProps } from "next";
import { Section } from "types/content";
import Layout from "../components/Layout/index";
import { createContext, useEffect } from "react";
import config from "config/config.json";
import OpenGraphHead from "components/OpenGraphHead";
import { pageViewGA } from "../hooks/usePageViewEffect";
import { useRouter } from "next/router";

interface Props {
  pageID: string;
  sections: Section[];
  markdown: string | null;
  pageTitle?: string;
  chapterTitle: string | null;
  currentSection?: Section;
}

interface PageContextData extends Props {
  currentSection?: Section;
}

export const PageContext = createContext<PageContextData>(null as any);

export default function Page(props: Props) {
  const router = useRouter();
  const { pageID, sections, pageTitle, currentSection } = props;

  if (sections) {
    sections.sort((a, b) => a.index - b.index);
    sections.forEach((section) => {
      section.chapters.sort((a, b) => a.index - b.index);
    });
  }

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    pageViewGA({
      pagePath: `/${pageID}`,
      pageTitle: pageTitle,
    });
  }, [router.asPath]);

  return (
    <PageContext.Provider value={{ ...props, currentSection }}>
      <OpenGraphHead title={pageTitle} />
      <Layout />
    </PageContext.Provider>
  );
}

export const getStaticPaths = async () => {
  const ids = getAllPageIds();

  // 기존 링크가 대시 없는 ID 로도 퍼져 있어 두 형태 모두 사전 렌더링한다
  const slugs = new Set<string>();
  ids.forEach((id) => {
    slugs.add(id);
    slugs.add(id.replace(/-/g, ""));
  });

  console.log(`pre-render page count : ${slugs.size}`);

  // 루트(`/`) 와 알 수 없는 경로는 요청 시점에 만든다
  return {
    fallback: "blocking",
    paths: Array.from(slugs).map((slug) => ({ params: { slug: [slug] } })),
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as { slug?: string[] };

  const rawPageID = Array.isArray(slug) ? slug[0] : config.homePageID;
  const pageID = toDashedUuid(rawPageID);
  const isContentPage = Array.isArray(slug) && slug.length === 1;

  const sections = getSections();
  const pageContent = getPageContent(pageID);

  let currentSection: Section | null = null;
  if (isContentPage) {
    currentSection =
      sections.find((section) => {
        return (
          section.chapters.findIndex((chapter) => chapter.id === pageID) !== -1
        );
      }) || null;
  }

  const chapterTitle = pageContent?.title ?? null;

  let pageTitle: string | null = null;
  if (chapterTitle) {
    pageTitle = `${chapterTitle} - ${config.site}`;
  }

  if (currentSection) {
    pageTitle = `${chapterTitle} - ${currentSection.title}`;
  }

  return {
    props: {
      pageID,
      pageTitle,
      chapterTitle,
      currentSection,
      sections,
      markdown: pageContent?.markdown ?? null,
    },
  };
};
