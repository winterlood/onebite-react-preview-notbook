/**
 * 이미 받아둔 content/*.md 를 다듬는다. scrape-notion.mjs 를 고친 뒤,
 * 노션을 다시 긁지 않고 기존 결과물에만 같은 규칙을 적용할 때 쓴다.
 *
 *   node scripts/fix-markdown.mjs
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const CONTENT_DIR = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "content"
);

// 사이드바 목차와 겹치는 "Table Of Contents" 콜아웃
const TOC_CALLOUT =
  /<div class="notion-callout">\n\s*<span class="notion-callout-icon">[^<]*<\/span>\n\s*<div class="notion-callout-content">(?:<strong>)?\s*(?:table of contents|목차)\s*(?:<\/strong>)?<\/div>\n<\/div>\n*/gi;

/** 코드 펜스 안은 마크다운 문법이 아니므로 규칙 적용에서 제외한다 */
const outsideCodeFences = (markdown, transform) =>
  markdown
    .split(/(^```[\s\S]*?^```$)/gm)
    .map((chunk, i) => (i % 2 === 1 ? chunk : transform(chunk)))
    .join("");

const rules = [
  { name: "목차 콜아웃 제거", apply: (md) => md.replace(TOC_CALLOUT, "") },
  {
    // `\<Install\>` 을 rehype-raw 가 태그로 읽어 렌더링이 깨진다
    name: "부등호 이스케이프를 HTML 엔티티로",
    apply: (md) =>
      outsideCodeFences(md, (chunk) =>
        chunk.replace(/\\</g, "&lt;").replace(/\\>/g, "&gt;")
      ),
  },
  {
    // `**글 **` 처럼 마커 안쪽에 공백이 있으면 강조로 파싱되지 않는다.
    // 여는 마커와 닫는 마커를 한 쌍으로 잡아 공백을 바깥으로 밀어낸다.
    // (여는 쪽과 닫는 쪽을 따로 치환하면 서로의 결과를 되돌린다.)
    name: "강조 마커 안쪽 공백 정리",
    apply: (md) =>
      outsideCodeFences(md, (chunk) =>
        // 노션 본문에는 일반 공백 말고 NBSP( ) 도 섞여 있다
        chunk.replace(
          /(\*\*|~~)([ \t ]*)(\S(?:[\s\S]*?\S)??)([ \t ]*)\1/g,
          "$2$1$3$1$4"
        )
      ),
  },
  {
    // 노션에서 공백만 굵게 지정한 흔적. 마커만 남아 그대로 노출된다.
    name: "빈 강조 마커 제거",
    apply: (md) =>
      outsideCodeFences(md, (chunk) =>
        chunk.replace(/(\*\*|~~)([ \t\u00a0]*)\1/g, "$2")
      ),
  },
  {
    // CommonMark 는 닫는 마커 앞이 구두점이고 뒤에 글자가 붙으면 강조로 닫지 않는다.
    // (`**...(Y/ N)?**라는` 같은 문장) 이런 경우만 HTML 태그로 바꿔 의도대로 굵게 만든다.
    name: "닫히지 않는 강조를 strong 태그로",
    apply: (md) =>
      outsideCodeFences(md, (chunk) =>
        chunk.replace(
          /\*\*([^*\n]+[?!.,;:)\]}"’”])\*\*(?=[^\s!-\/:-@\[-`{-~])/g,
          "<strong>$1</strong>"
        )
      ),
  },
];

const files = (await fs.readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
const changedBy = Object.fromEntries(rules.map((r) => [r.name, 0]));
let changedFiles = 0;

for (const file of files) {
  const full = path.join(CONTENT_DIR, file);
  const original = await fs.readFile(full, "utf-8");

  let markdown = original;
  for (const rule of rules) {
    const next = rule.apply(markdown);
    if (next !== markdown) changedBy[rule.name] += 1;
    markdown = next;
  }

  if (markdown !== original) {
    await fs.writeFile(full, markdown, "utf-8");
    changedFiles += 1;
  }
}

console.log(`${changedFiles}/${files.length}개 파일 수정`);
for (const [name, count] of Object.entries(changedBy)) {
  console.log(`  ${name}: ${count}개 파일`);
}
