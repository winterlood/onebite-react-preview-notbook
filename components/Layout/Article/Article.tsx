import {
  ArticleWrapper,
  NavWrapper,
  StyledNotionRenderer,
} from "./Article.style";
import { useContext, useMemo } from "react";
import { Section } from "types/content";
import dynamic from "next/dynamic";
import { CodeBlock } from "../../../types/notion";
import { useRouter } from "next/router";
import { Alert, CircularProgress } from "@mui/material";
import NearPageButton from "./NearPageButton/index";
import EmptyArticle from "./EmptyArticle";
import { PageContext } from "../../../pages/[[...slug]]";
import { getPageTitle } from "notion-utils";
import PageTitle from "./PageTitle";
import PageAside from "./PageAside";

const Code = dynamic(() => import("./Code"), {
  loading: () => <>코드를 불러오는 중 입니다 ...</>,
  ssr: false,
});

function getNearChapters(pageID: string, currentSection: Section) {
  const curChapterIdx = currentSection.chapters.findIndex(
    (chapter) => chapter.id === pageID
  );
  if (curChapterIdx === -1) {
    return {
      prevChapter: undefined,
      nextChapter: undefined,
    };
  }
  return {
    prevChapter:
      curChapterIdx !== 0
        ? currentSection.chapters.at(curChapterIdx - 1)
        : undefined,
    nextChapter:
      curChapterIdx !== currentSection.chapters.length - 1
        ? currentSection.chapters.at(curChapterIdx + 1)
        : undefined,
  };
}

export default function Article() {
  const router = useRouter();

  const { pageID, recordMap, currentSection } = useContext(PageContext);

  const { prevChapter, nextChapter } = useMemo(() => {
    if (!currentSection) {
      return {
        prevChapter: undefined,
        nextChapter: undefined,
      };
    }
    return getNearChapters(pageID, currentSection);
  }, [currentSection]);

  return (
    <ArticleWrapper>
      {recordMap ? (
        <StyledNotionRenderer
          pageTitle={<PageTitle recordMap={recordMap} />}
          pageAside={<PageAside />}
          darkMode={true}
          disableHeader={true}
          fullPage={true}
          showTableOfContents={true}
          recordMap={recordMap}
          className={"test"}
          components={{
            Code: (e: CodeBlock) => {
              return <Code {...e} />;
            },
          }}
        />
      ) : router.isFallback ? (
        <CircularProgress />
      ) : (
        <EmptyArticle />
      )}
      <NavWrapper>
        {prevChapter && <NearPageButton type={"PREV"} {...prevChapter} />}
        {nextChapter && <NearPageButton type={"NEXT"} {...nextChapter} />}
      </NavWrapper>
    </ArticleWrapper>
  );
}
