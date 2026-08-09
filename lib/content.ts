import fs from "fs";
import path from "path";
import { Section } from "types/content";

/**
 * scripts/scrape-notion.mjs 가 만들어 둔 로컬 마크다운을 읽는다.
 * 빌드 타임에만 호출되므로 노션 API 에 의존하지 않는다.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

interface PageMeta {
  id: string;
  title: string;
  last_edited_time: string | number;
}

interface ContentIndex {
  sections: Section[];
  pages: Record<string, PageMeta>;
}

export interface PageContent {
  pageId: string;
  title: string;
  markdown: string;
}

let cache: ContentIndex | null = null;

const readIndex = (): ContentIndex => {
  // 개발 중에는 스크래핑 결과가 바로 반영되도록 캐시하지 않는다
  if (cache && process.env.NODE_ENV !== "development") return cache;
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, "index.json"), "utf-8");
    cache = JSON.parse(raw) as ContentIndex;
  } catch (e) {
    console.warn(
      "[content] content/index.json 을 읽지 못했습니다. `npm run scrape` 를 먼저 실행하세요."
    );
    cache = { sections: [], pages: {} };
  }
  return cache;
};

/** URL 에는 대시 없는 형태와 있는 형태가 섞여 있어 항상 대시 있는 형태로 맞춘다 */
export const toDashedUuid = (id: string): string => {
  const clean = id.replace(/-/g, "");
  if (clean.length !== 32) return id;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(
    12,
    16
  )}-${clean.slice(16, 20)}-${clean.slice(20)}`;
};

export const getSections = (): Section[] => {
  const sections = readIndex().sections.map((section) => ({
    ...section,
    chapters: [...section.chapters].sort((a, b) => a.index - b.index),
  }));
  return sections.sort((a, b) => a.index - b.index);
};

/** 사전 렌더링 대상이 되는 모든 페이지 ID (대시 포함) */
export const getAllPageIds = (): string[] => Object.keys(readIndex().pages);

export const getPageContent = (pageID: string): PageContent | null => {
  const id = toDashedUuid(pageID);
  const meta = readIndex().pages[id];
  if (!meta) return null;

  let markdown = "";
  try {
    markdown = fs.readFileSync(path.join(CONTENT_DIR, `${id}.md`), "utf-8");
  } catch (e) {
    console.warn(`[content] ${id}.md 를 읽지 못했습니다.`);
    return null;
  }

  return { pageId: id, title: meta.title, markdown };
};

export const getPageMeta = (pageID: string): PageMeta | null =>
  readIndex().pages[toDashedUuid(pageID)] ?? null;
