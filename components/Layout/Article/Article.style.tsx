import styled from "@emotion/styled";
import { breakpoint } from "lib/breakpoint";
import {
  ARTICLE_HORIZON_PADDING,
  ARTICLE_VERTICAL_PADDING,
  HEADER_HEIGHT,
} from "lib/layout";

export const ArticleWrapper = styled("article")`
  padding: ${ARTICLE_HORIZON_PADDING} ${ARTICLE_VERTICAL_PADDING};
  min-height: none;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const MarkdownLayout = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4rem;
  width: 100%;

  @media (max-width: ${breakpoint.desktop}) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const MarkdownContent = styled("div")`
  flex: 1;
  min-width: 0;
  max-width: 760px;
  width: 100%;
`;

export const MarkdownAside = styled("aside")`
  flex: 0 0 240px;
  position: sticky;
  top: calc(${HEADER_HEIGHT} + 1.5rem);
  align-self: flex-start;
  max-height: calc(100vh - ${HEADER_HEIGHT} - 3rem);
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${breakpoint.wide}) {
    display: none;
  }
`;

export const TocHeader = styled("div")`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--fg-opacity-color);
  margin-bottom: -0.75rem;
`;

export const TocList = styled("nav")`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const TocLink = styled("a")<{ $level: number }>`
  font-size: 14px;
  line-height: 1.5;
  color: var(--fg-opacity-color);
  text-decoration: none;
  padding-left: ${({ $level }) => ($level - 1) * 12}px;

  &:hover {
    color: var(--primary-color);
  }
`;

export const MarkdownWrapper = styled("div")`
  color: var(--fg-color);
  font-size: 16px;
  line-height: 1.7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Arial, sans-serif;
  word-break: break-word;

  h1,
  h2,
  h3,
  h4 {
    color: var(--fg-color);
    font-weight: 600;
    line-height: 1.3;
    margin: 2em 0 0.6em;
    scroll-margin-top: 100px;
  }
  h1 {
    font-size: 1.875em;
  }
  h2 {
    font-size: 1.5em;
    color: var(--primary-color);
  }
  h3 {
    font-size: 1.25em;
  }
  h4 {
    font-size: 1.05em;
  }

  p {
    margin: 0.6em 0;
  }

  a {
    color: var(--primary-color);
    text-decoration: underline;
    text-underline-offset: 3px;
    word-break: break-all;
  }

  ul,
  ol {
    padding-left: 1.6em;
    margin: 0.6em 0;
  }
  li {
    margin: 0.25em 0;
  }
  li > p {
    margin: 0;
  }

  blockquote {
    border-left: 3px solid var(--fg-opacity-color);
    padding: 0.4em 1em;
    margin: 1em 0;
    color: var(--fg-color);
    background: var(--bg-opacity-color);
    border-radius: 0 4px 4px 0;
  }

  hr {
    border: none;
    border-top: 1px solid var(--bg-opacity-color);
    margin: 2em 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 1em 0;
  }

  /* 캡션이 있는 이미지 */
  .notion-figure {
    margin: 1.5em 0;
  }
  .notion-figure img {
    margin: 0;
  }
  .notion-figure figcaption {
    margin-top: 0.5em;
    font-size: 14px;
    color: var(--fg-opacity-color);
  }

  /* 코드 블록 캡션 */
  .code-caption {
    margin: 0.4em 0 0;
    font-size: 14px;
    color: var(--fg-opacity-color);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 0.95em;
  }
  th,
  td {
    border: 1px solid var(--bg-opacity-color);
    padding: 0.5em 0.8em;
    text-align: left;
  }
  th {
    background: var(--bg-opacity-color);
    font-weight: 600;
  }

  /* inline code */
  code {
    background: var(--bg-opacity-color);
    color: var(--primary-color);
    padding: 0.15em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  /* 코드 하이라이터 내부에는 인라인 코드 스타일을 적용하지 않는다 */
  pre code,
  pre code * {
    background: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
    font-size: inherit !important;
  }
  pre code {
    color: inherit;
  }

  pre ::selection,
  pre code ::selection,
  pre code *::selection {
    background: var(--primary-tinted-color);
    color: inherit;
  }

  input[type="checkbox"] {
    margin-right: 0.5em;
  }

  /* bookmark card */
  .notion-bookmark {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 1rem;
    margin: 1em 0;
    background: var(--bg-opacity-color);
    border: 1px solid var(--bg-opacity-color);
    border-radius: 6px;
    text-decoration: none !important;
    color: inherit !important;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .notion-bookmark:hover {
    background: var(--primary-tinted-color);
    border-color: var(--primary-color);
  }
  .notion-bookmark-host {
    font-size: 12px;
    color: var(--fg-opacity-color);
    letter-spacing: 0.02em;
  }
  .notion-bookmark-url {
    font-size: 14px;
    color: var(--primary-color);
    word-break: break-all;
  }
  .notion-bookmark-caption {
    font-size: 13px;
    color: var(--fg-opacity-color);
    margin-top: 0.25rem;
  }

  /* callout */
  .notion-callout {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.2rem;
    margin: 1em 0;
    background: var(--bg-opacity-color);
    border: 1px solid var(--bg-opacity-color);
    border-radius: 6px;
  }
  .notion-callout-icon {
    flex: 0 0 auto;
    font-size: 1.2em;
    line-height: 1.5;
  }
  .notion-callout-content {
    flex: 1;
    min-width: 0;
    line-height: 1.7;
  }

  /* embed / video */
  .notion-embed {
    margin: 1em 0;
    border-radius: 6px;
    overflow: hidden;
    background: #000;
  }
  .notion-embed iframe,
  .notion-embed video {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    border: none;
  }

  /* toggle */
  details {
    margin: 1em 0;
    padding: 0.5em 1em;
    background: var(--bg-opacity-color);
    border: 1px solid var(--bg-opacity-color);
    border-radius: 6px;
  }
  details > summary {
    cursor: pointer;
    font-weight: 500;
    padding: 0.25em 0;
    user-select: none;
  }
  details[open] > summary {
    margin-bottom: 0.5em;
    border-bottom: 1px solid var(--bg-opacity-color);
    padding-bottom: 0.5em;
  }
`;

export const NavWrapper = styled("div")`
  @media (min-width: ${breakpoint.desktop}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const NavButton = styled("div")`
  cursor: pointer;
`;
