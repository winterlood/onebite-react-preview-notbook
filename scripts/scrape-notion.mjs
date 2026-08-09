/**
 * 노션 문서를 마크다운으로 스크래핑해 content/ 에 저장한다.
 *
 *   node scripts/scrape-notion.mjs
 *
 * 결과물
 *   content/index.json            섹션/챕터 구조 + 페이지 메타
 *   content/<pageId>.md           페이지 본문 마크다운
 *   public/content-images/<...>   페이지에 포함된 이미지
 *
 * 노션 공개 API 키 없이 공개 페이지 API(api/v3)만 사용한다.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("../config/config.json");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content");
const IMAGE_DIR = path.join(ROOT, "public", "content-images");
const IMAGE_URL_PREFIX = "/content-images";

const SPACE_ID = "43589d70-5a34-4900-981f-67be2447c652";
const COLLECTION_ID = "f9de0b84-4815-4309-abc3-c33ade0ce7ee";
const COLLECTION_VIEW_ID = "e7d7e39e-9d8c-4a6d-bd73-732625e0f2df";

// 커리큘럼 DB 스키마 (queryCollection 은 속성을 스키마 키로 돌려준다)
const SCHEMA = {
  section_index: "Dp@V",
  section_title: "O^SK",
  chapter_index: "TMwM",
  chapter_title: "title",
};

// Cloudflare 가 기본 UA 를 막는다
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const unsupported = new Set();

/* ------------------------------------------------------------------ */
/* notion api                                                          */
/* ------------------------------------------------------------------ */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 노션 비공식 API 는 연속 호출에 429 를 잘 뱉는다. 호출 간 최소 간격을 강제한다.
const MIN_INTERVAL_MS = 400;
let lastCallAt = 0;

async function throttle() {
  const wait = lastCallAt + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastCallAt = Date.now();
}

async function notionApi(endpoint, body) {
  const MAX_ATTEMPTS = 6;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    await throttle();

    const res = await fetch(`https://www.notion.so/api/v3/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": UA,
        Accept: "*/*",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) return res.json();

    const isLastAttempt = attempt === MAX_ATTEMPTS - 1;
    if (isLastAttempt) {
      throw new Error(
        `${endpoint} ${res.status}: ${(await res.text()).slice(0, 120)}`
      );
    }

    const backoff =
      res.status === 429 || res.status === 403
        ? 5000 * Math.pow(2, attempt)
        : 1000 * (attempt + 1);
    console.warn(`  … ${endpoint} ${res.status}, ${backoff / 1000}초 후 재시도`);
    await sleep(backoff);
  }
}

const dashed = (id) => {
  const clean = id.replace(/-/g, "");
  if (clean.length !== 32) return id;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(
    12,
    16
  )}-${clean.slice(16, 20)}-${clean.slice(20)}`;
};

const unwrap = (record) => record?.value?.value ?? record?.value ?? null;

/** loadCachedPageChunk 를 커서가 빌 때까지 돌려 블록 맵을 모은다 */
async function fetchBlockMap(pageId) {
  const blocks = {};
  let cursor = { stack: [] };
  let chunkNumber = 0;

  while (true) {
    const data = await notionApi("loadCachedPageChunk", {
      page: { id: pageId },
      limit: 100,
      cursor,
      chunkNumber,
      verticalColumns: false,
    });
    for (const [id, record] of Object.entries(data.recordMap?.block ?? {})) {
      const block = unwrap(record);
      if (block?.id) blocks[id] = block;
    }
    if (!data.cursor?.stack?.length) break;
    cursor = data.cursor;
    chunkNumber += 1;
  }

  // 청크에 딸려오지 않은 자식 블록을 보충한다
  for (let round = 0; round < 5; round++) {
    const missing = new Set();
    for (const block of Object.values(blocks)) {
      for (const childId of block.content ?? []) {
        if (!blocks[childId]) missing.add(childId);
      }
    }
    if (missing.size === 0) break;

    const ids = [...missing];
    for (let i = 0; i < ids.length; i += 50) {
      const data = await notionApi("syncRecordValues", {
        requests: ids.slice(i, i + 50).map((id) => ({
          pointer: { table: "block", id, spaceId: SPACE_ID },
          version: -1,
        })),
      });
      for (const [id, record] of Object.entries(data.recordMap?.block ?? {})) {
        const block = unwrap(record);
        if (block?.id) blocks[id] = block;
      }
    }
  }

  return blocks;
}

async function fetchChapters() {
  const data = await notionApi("queryCollection?src=initial_load", {
    source: { type: "collection", id: COLLECTION_ID, spaceId: SPACE_ID },
    collectionView: { id: COLLECTION_VIEW_ID, spaceId: SPACE_ID },
    loader: {
      reducers: { collection_group_results: { type: "results", limit: 500 } },
      searchQuery: "",
      sortQuery: [],
      userTimeZone: "Asia/Seoul",
      type: "results",
    },
  });

  const ids =
    data.result?.reducerResults?.collection_group_results?.blockIds ?? [];
  const blocks = data.recordMap?.block ?? {};

  return ids
    .map((id) => {
      const block = unwrap(blocks[id]);
      if (!block) return null;
      const plain = (key) => richTextToPlain(block.properties?.[key]);
      return {
        id: block.id,
        last_edited_time: block.last_edited_time ?? Date.now(),
        section: {
          index: Number(plain(SCHEMA.section_index)) || 0,
          title: plain(SCHEMA.section_title),
        },
        chapter: {
          index: Number(plain(SCHEMA.chapter_index)) || 0,
          title: plain(SCHEMA.chapter_title),
        },
      };
    })
    .filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* rich text                                                           */
/* ------------------------------------------------------------------ */

const richTextToPlain = (richText) =>
  (richText ?? []).map(([text]) => (typeof text === "string" ? text : "")).join("");

const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * 마크다운 문법으로 해석될 문자를 이스케이프한다 (코드/링크 안에서는 쓰지 않는다).
 * `<` `>` 는 백슬래시로 막으면 rehype-raw 가 `\<Install\>` 을 태그로 잘못 읽으므로
 * HTML 엔티티로 바꾼다.
 */
const escapeMarkdown = (s) =>
  s
    .replace(/([\\`*_{}\[\]])/g, "\\$1")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^(\s*)#/gm, "$1\\#");

/**
 * 마크다운 강조는 마커 안쪽에 공백이 붙으면 (`**글 **`) 강조로 파싱되지 않는다.
 * 노션 원문에 흔한 형태라 공백을 마커 바깥으로 밀어낸다.
 */
const wrapEmphasis = (text, marker) => {
  const matched = /^(\s*)([\s\S]*?)(\s*)$/.exec(text);
  if (!matched || !matched[2]) return text;
  return `${matched[1]}${marker}${matched[2]}${marker}${matched[3]}`;
};

function richTextToMarkdown(richText) {
  if (!richText?.length) return "";

  return richText
    .map(([text, decorations]) => {
      if (typeof text !== "string") return "";

      let out = text;
      let isCode = (decorations ?? []).some(([type]) => type === "c");
      let equation = (decorations ?? []).find(([type]) => type === "e");

      if (equation) return `$${equation[1]}$`;
      out = isCode ? `\`${out.replace(/`/g, "\\`")}\`` : escapeMarkdown(out);

      for (const [type, value] of decorations ?? []) {
        switch (type) {
          case "b":
            out = wrapEmphasis(out, "**");
            break;
          case "i":
            out = wrapEmphasis(out, "*");
            break;
          case "s":
            out = wrapEmphasis(out, "~~");
            break;
          case "_":
            out = `<u>${out}</u>`;
            break;
          case "a":
            out = `[${out}](${value})`;
            break;
          case "c":
          case "h":
          case "e":
          default:
            break;
        }
      }
      return out;
    })
    .join("");
}

/** 콜아웃/북마크처럼 HTML 로 감싸는 블록 안에서 쓰는 인라인 변환 */
function richTextToHtml(richText) {
  if (!richText?.length) return "";
  return richText
    .map(([text, decorations]) => {
      if (typeof text !== "string") return "";
      let out = escapeHtml(text);
      for (const [type, value] of decorations ?? []) {
        if (type === "b") out = `<strong>${out}</strong>`;
        else if (type === "i") out = `<em>${out}</em>`;
        else if (type === "c") out = `<code>${out}</code>`;
        else if (type === "s") out = `<del>${out}</del>`;
        else if (type === "a")
          out = `<a href="${escapeHtml(
            value
          )}" target="_blank" rel="noopener noreferrer">${out}</a>`;
      }
      return out;
    })
    .join("")
    .replace(/\n/g, "<br />");
}

/* ------------------------------------------------------------------ */
/* images                                                              */
/* ------------------------------------------------------------------ */

const EXT_BY_MIME = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

const isNotionHosted = (url) =>
  /(prod-files-secure\.s3|s3[.-]us-west-2\.amazonaws\.com|secure\.notion-static\.com|notion-static\.com|notion\.so\/image\/)/.test(
    url
  );

/**
 * 노션이 돌려주는 S3 URL 은 만료되므로 이미지를 내려받아 public/ 에 둔다.
 * 이미 받아둔 파일이 있으면 재사용한다.
 */
async function downloadImage(rawUrl, pageId, blockId) {
  const dir = path.join(IMAGE_DIR, pageId);
  const existing = await fs.readdir(dir).catch(() => []);
  const cached = existing.find((name) => name.startsWith(`${blockId}.`));
  if (cached) return `${IMAGE_URL_PREFIX}/${pageId}/${cached}`;

  const url = isNotionHosted(rawUrl)
    ? `https://www.notion.so/image/${encodeURIComponent(
        rawUrl
      )}?table=block&id=${blockId}&cache=v2`
    : rawUrl;

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    console.warn(`  ! image ${res.status}: ${rawUrl.slice(0, 80)}`);
    return null;
  }

  const mime = (res.headers.get("content-type") ?? "").split(";")[0].trim();
  const ext =
    EXT_BY_MIME[mime] ||
    path.extname(new URL(rawUrl, "https://www.notion.so").pathname) ||
    ".png";
  const fileName = `${blockId}${ext}`;

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, fileName),
    Buffer.from(await res.arrayBuffer())
  );
  return `${IMAGE_URL_PREFIX}/${pageId}/${fileName}`;
}

/* ------------------------------------------------------------------ */
/* block -> markdown                                                   */
/* ------------------------------------------------------------------ */

const HEADING_PREFIX = {
  header: "#",
  sub_header: "##",
  sub_sub_header: "###",
};

/** 북마크·링크 프리뷰를 같은 모양의 카드로 만든다 (captionHtml 은 이미 이스케이프된 HTML) */
function bookmarkCard(url, label, captionHtml = "") {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {}

  return [
    `<a class="notion-bookmark" href="${escapeHtml(
      url
    )}" target="_blank" rel="noopener noreferrer">`,
    label
      ? `  <span class="notion-bookmark-host">${escapeHtml(
          host
        )} · ${escapeHtml(label)}</span>`
      : `  <span class="notion-bookmark-host">${escapeHtml(host)}</span>`,
    `  <span class="notion-bookmark-url">${escapeHtml(url)}</span>`,
    captionHtml
      ? `  <span class="notion-bookmark-caption">${captionHtml}</span>`
      : "",
    `</a>`,
  ]
    .filter(Boolean)
    .join("\n");
}

const indent = (text, depth) =>
  text
    .split("\n")
    .map((line) => (line ? "  ".repeat(depth) + line : line))
    .join("\n");

async function blockToMarkdown(block, ctx, depth, ordinal) {
  const props = block.properties ?? {};
  const title = props.title;

  switch (block.type) {
    case "text": {
      const text = richTextToMarkdown(title);
      return text ? text : "";
    }

    case "header":
    case "sub_header":
    case "sub_sub_header":
      return `${HEADING_PREFIX[block.type]} ${richTextToMarkdown(title)}`;

    case "bulleted_list":
      return `- ${richTextToMarkdown(title)}${await childrenToMarkdown(
        block,
        ctx,
        depth + 1
      )}`;

    case "numbered_list":
      return `${ordinal}. ${richTextToMarkdown(title)}${await childrenToMarkdown(
        block,
        ctx,
        depth + 1
      )}`;

    case "to_do": {
      const checked = richTextToPlain(props.checked) === "Yes";
      return `- [${checked ? "x" : " "}] ${richTextToMarkdown(title)}`;
    }

    case "quote":
      return richTextToMarkdown(title)
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");

    case "code": {
      const code = richTextToPlain(title);
      const language = (richTextToPlain(props.language) || "text")
        .toLowerCase()
        .replace(/\s+/g, "");
      const caption = richTextToPlain(props.caption);
      const fence = code.includes("```") ? "````" : "```";
      const body = `${fence}${language}\n${code}\n${fence}`;
      return caption ? `${body}\n<p class="code-caption">${escapeHtml(caption)}</p>` : body;
    }

    case "image": {
      const source =
        richTextToPlain(props.source) || block.format?.display_source;
      if (!source) return "";
      const local = await downloadImage(source, ctx.pageId, block.id);
      if (!local) return "";
      const caption = richTextToPlain(props.caption);
      const image = `![${caption.replace(/[\[\]]/g, "")}](${local})`;
      return caption
        ? `<figure class="notion-figure">\n\n${image}\n\n<figcaption>${escapeHtml(
            caption
          )}</figcaption>\n</figure>`
        : image;
    }

    case "callout": {
      // 목차 콜아웃은 사이드바 TOC 로 대체한다
      const plain = richTextToPlain(title).trim().toLowerCase();
      if (plain === "table of contents" || plain === "목차") return "";

      const icon =
        block.format?.page_icon && !/^https?:/.test(block.format.page_icon)
          ? block.format.page_icon
          : "💡";
      return [
        `<div class="notion-callout">`,
        `  <span class="notion-callout-icon">${escapeHtml(icon)}</span>`,
        `  <div class="notion-callout-content">${richTextToHtml(title)}</div>`,
        `</div>`,
      ].join("\n");
    }

    // 깃허브 링크 프리뷰 등 노션의 "링크 미리보기" 블록. 북마크 카드로 낮춰 렌더링한다.
    case "external_object_instance": {
      const url = block.format?.uri;
      if (!url) return "";
      const attributes = block.format?.attributes ?? [];
      const label =
        attributes.find((it) => it.id === "title")?.values?.[0] ?? "";
      return bookmarkCard(url, label);
    }

    case "bookmark": {
      const url = richTextToPlain(props.link);
      if (!url) return "";
      return bookmarkCard(url, "", richTextToHtml(props.caption));
    }

    case "video":
    case "embed": {
      const url =
        richTextToPlain(props.source) || block.format?.display_source || "";
      if (!url) return "";
      const youtube = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
      const src = youtube
        ? `https://www.youtube.com/embed/${youtube[1]}`
        : url;
      return `<div class="notion-embed"><iframe src="${escapeHtml(
        src
      )}" loading="lazy" allowfullscreen></iframe></div>`;
    }

    case "toggle": {
      const children = await childrenToMarkdown(block, ctx, 0);
      return [
        `<details>`,
        `<summary>${richTextToHtml(title)}</summary>`,
        ``,
        children.trim(),
        ``,
        `</details>`,
      ].join("\n");
    }

    case "divider":
      return "---";

    case "equation":
      return `$$\n${richTextToPlain(title)}\n$$`;

    case "column_list":
    case "column":
      return (await childrenToMarkdown(block, ctx, depth)).trim();

    case "table":
      return tableToMarkdown(block, ctx);

    case "page": {
      // 하위 페이지 링크. 루트 페이지 자신은 호출부에서 걸러진다.
      const pageTitle = richTextToPlain(title);
      return pageTitle
        ? `[${escapeMarkdown(pageTitle)}](/${block.id.replace(/-/g, "")})`
        : "";
    }

    // 사이드바 목차로 대체하거나 렌더링 대상이 아닌 블록들
    case "table_of_contents":
    case "collection_view":
    case "collection_view_page":
    case "breadcrumb":
      return "";

    default:
      unsupported.add(block.type);
      return richTextToMarkdown(title);
  }
}

function tableToMarkdown(block, ctx) {
  const rows = (block.content ?? [])
    .map((id) => ctx.blocks[id])
    .filter((row) => row?.type === "table_row");
  if (!rows.length) return "";

  const columns = block.format?.table_block_column_order ?? [];
  const hasHeader = block.format?.table_block_column_header ?? false;

  const toCells = (row) =>
    columns.map((col) =>
      richTextToMarkdown(row.properties?.[col]).replace(/\|/g, "\\|") || " "
    );

  const body = rows.map(toCells);
  const header = hasHeader ? body.shift() : columns.map(() => " ");

  return [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...body.map((cells) => `| ${cells.join(" | ")} |`),
  ].join("\n");
}

async function childrenToMarkdown(block, ctx, depth) {
  const childIds = (block.content ?? []).filter(
    (id) => ctx.blocks[id] && ctx.blocks[id].type !== "table_row"
  );
  if (!childIds.length) return "";
  const rendered = await blockListToMarkdown(childIds, ctx, depth);
  return rendered ? `\n${indent(rendered, depth)}` : "";
}

async function blockListToMarkdown(ids, ctx, depth) {
  const parts = [];
  let ordinal = 0;

  for (const id of ids) {
    const block = ctx.blocks[id];
    if (!block) continue;

    ordinal = block.type === "numbered_list" ? ordinal + 1 : 0;

    const markdown = await blockToMarkdown(block, ctx, depth, ordinal);
    if (markdown.trim() === "") {
      // 노션의 빈 문단은 문단 사이 여백으로만 쓰인다
      continue;
    }
    parts.push({ type: block.type, markdown });
  }

  // 같은 종류의 리스트끼리는 붙이고, 그 외에는 빈 줄로 띄운다.
  // 단 앞 항목이 이미지 같은 자식 블록을 품어 여러 줄이 됐다면 빈 줄로 끊어야 한다.
  // 그러지 않으면 뒤 항목이 앞 항목의 HTML 블록에 흡수돼 리스트로 파싱되지 않는다.
  const LIST_TYPES = new Set(["bulleted_list", "numbered_list", "to_do"]);
  let out = "";
  parts.forEach((part, i) => {
    if (i === 0) {
      out = part.markdown;
      return;
    }
    const prev = parts[i - 1];
    const tight =
      LIST_TYPES.has(part.type) &&
      LIST_TYPES.has(prev.type) &&
      part.type === prev.type &&
      !prev.markdown.includes("\n");
    out += (tight ? "\n" : "\n\n") + part.markdown;
  });

  return out;
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

async function scrapePage(pageId) {
  const id = dashed(pageId);
  const blocks = await fetchBlockMap(id);
  const root = blocks[id];
  if (!root) throw new Error(`page not found: ${id}`);

  const ctx = { blocks, pageId: id };
  const markdown = await blockListToMarkdown(root.content ?? [], ctx, 0);

  return {
    id,
    title: richTextToPlain(root.properties?.title),
    last_edited_time: root.last_edited_time ?? Date.now(),
    markdown: `${markdown.trim()}\n`,
  };
}

/* ------------------------------------------------------------------ */
/* main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(IMAGE_DIR, { recursive: true });

  console.log("커리큘럼 DB 조회 중...");
  const chapters = await fetchChapters();
  console.log(`  챕터 ${chapters.length}개`);

  const menuIds = config.menus
    .filter((menu) => menu.type === "INNER" && menu.id)
    .map((menu) => dashed(menu.id));
  const chapterIds = chapters.map((chapter) => chapter.id);
  const extraIds = [dashed(config.homePageID), ...menuIds].filter(
    (id) => !chapterIds.includes(id)
  );

  const limit = Number(process.env.LIMIT) || Infinity;
  const targets = [...chapterIds, ...extraIds].slice(0, limit);

  // 429 로 중간에 끊겨도 다시 실행하면 남은 페이지부터 이어받는다 (FORCE=1 로 전체 재수집)
  const previous = JSON.parse(
    await fs.readFile(path.join(CONTENT_DIR, "index.json"), "utf-8").catch(
      () => '{"pages":{}}'
    )
  );
  const pages = process.env.FORCE ? {} : { ...(previous.pages ?? {}) };
  const failedIds = [];

  for (const [i, id] of targets.entries()) {
    const label = `[${i + 1}/${targets.length}] ${id}`;

    if (pages[id]) {
      const exists = await fs
        .access(path.join(CONTENT_DIR, `${id}.md`))
        .then(() => true)
        .catch(() => false);
      if (exists) {
        console.log(`${label} · 건너뜀 (${pages[id].title})`);
        continue;
      }
    }

    try {
      const page = await scrapePage(id);
      await fs.writeFile(
        path.join(CONTENT_DIR, `${id}.md`),
        page.markdown,
        "utf-8"
      );
      pages[id] = {
        id: page.id,
        title: page.title,
        last_edited_time: page.last_edited_time,
      };
      console.log(`${label} ✓ ${page.title} (${page.markdown.length}자)`);
      await writeIndex(chapters, pages);
    } catch (e) {
      failedIds.push(id);
      console.warn(`${label} ✗ ${e.message}`);
    }
  }

  await writeIndex(chapters, pages);

  console.log(`\n완료: 페이지 ${Object.keys(pages).length}개`);
  if (failedIds.length) {
    console.log(
      `실패 ${failedIds.length}개 — 다시 실행하면 이어받습니다:\n  ${failedIds.join(
        "\n  "
      )}`
    );
  }
  if (unsupported.size) {
    console.log(`처리하지 않은 블록 타입: ${[...unsupported].join(", ")}`);
  }
}

function buildSections(chapters) {
  const sections = [];
  for (const page of chapters) {
    let section = sections.find((it) => it.index === page.section.index);
    if (!section) {
      section = {
        index: page.section.index,
        title: page.section.title,
        chapters: [],
      };
      sections.push(section);
    }
    section.chapters.push({
      id: page.id,
      last_edited_time: page.last_edited_time,
      title: page.chapter.title,
      index: page.chapter.index,
      section_title: page.section.title,
      section_index: page.section.index,
    });
  }
  sections.sort((a, b) => a.index - b.index);
  sections.forEach((section) =>
    section.chapters.sort((a, b) => a.index - b.index)
  );
  return sections;
}

async function writeIndex(chapters, pages) {
  await fs.writeFile(
    path.join(CONTENT_DIR, "index.json"),
    JSON.stringify({ sections: buildSections(chapters), pages }, null, 2),
    "utf-8"
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
