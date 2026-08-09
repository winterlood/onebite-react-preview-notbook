import {
  ArticleWrapper,
  MarkdownAside,
  MarkdownContent,
  MarkdownLayout,
  MarkdownWrapper,
  NavWrapper,
  TocHeader,
  TocList,
  TocLink,
} from "./Article.style";
import { isValidElement, ReactNode, useContext, useMemo } from "react";
import { Section } from "types/content";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import NearPageButton from "./NearPageButton/index";
import EmptyArticle from "./EmptyArticle";
import { PageContext } from "../../../pages/[[...slug]]";
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

const reactToText = (children: ReactNode): string => {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(reactToText).join("");
  if (isValidElement(children))
    return reactToText((children.props as { children?: ReactNode }).children);
  return "";
};

// 유니코드 프로퍼티 이스케이프(\p{L}) 대신 제거할 문자를 직접 나열한다.
// 이 프로젝트는 babel 로 트랜스파일되는데, \p{...} 변환 과정에서 빌드가 깨진다.
const PUNCTUATION = /[!"#$%&'()*+,./:;<=>?@\[\]^`{|}~\\·—–…“”‘’]/g;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(PUNCTUATION, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

interface TocItem {
  level: number;
  text: string;
  id: string;
}

const extractToc = (markdown: string): TocItem[] => {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const matched = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (!matched) continue;

    const text = matched[2].replace(/\*\*|__|`|\\/g, "").trim();
    toc.push({ level: matched[1].length, text, id: slugify(text) });
  }
  return toc;
};

/** 사이드바 목차에서 앵커로 이동할 수 있도록 heading 에 id 를 붙인다 */
const headingComponent = (level: 1 | 2 | 3 | 4) => {
  const Heading = ({ children }: { children?: ReactNode }) => {
    const id = slugify(reactToText(children));
    if (level === 1) return <h1 id={id}>{children}</h1>;
    if (level === 2) return <h2 id={id}>{children}</h2>;
    if (level === 3) return <h3 id={id}>{children}</h3>;
    return <h4 id={id}>{children}</h4>;
  };
  Heading.displayName = `MarkdownHeading${level}`;
  return Heading;
};

export default function Article() {
  const router = useRouter();

  const { pageID, markdown, chapterTitle, currentSection } =
    useContext(PageContext);

  const { prevChapter, nextChapter } = useMemo(() => {
    if (!currentSection) {
      return {
        prevChapter: undefined,
        nextChapter: undefined,
      };
    }
    return getNearChapters(pageID, currentSection);
  }, [currentSection]);

  const toc = useMemo(() => (markdown ? extractToc(markdown) : []), [markdown]);

  return (
    <ArticleWrapper>
      {markdown ? (
        <MarkdownLayout>
          <MarkdownContent>
            <PageTitle title={chapterTitle} />
            <MarkdownWrapper>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: headingComponent(1),
                  h2: headingComponent(2),
                  h3: headingComponent(3),
                  h4: headingComponent(4),
                  pre: ({ children }) => <>{children}</>,
                  code({ className, children }) {
                    const match = /language-(\w+)/.exec(className || "");
                    if (!match) {
                      return <code className={className}>{children}</code>;
                    }
                    const text = String(children).replace(/\n$/, "");
                    return <Code code={text} language={match[1]} />;
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </MarkdownWrapper>
          </MarkdownContent>
          <MarkdownAside>
            <PageAside />
            {toc.length > 0 && (
              <>
                <TocHeader>TABLE OF CONTENTS</TocHeader>
                <TocList>
                  {toc.map((item, idx) => (
                    <TocLink
                      key={`${item.id}-${idx}`}
                      href={`#${item.id}`}
                      $level={item.level}
                    >
                      {item.text}
                    </TocLink>
                  ))}
                </TocList>
              </>
            )}
          </MarkdownAside>
        </MarkdownLayout>
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
