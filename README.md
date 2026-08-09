# ONEBITE REACT PREVIEW NOTBOOK

《한 입 크기로 잘라먹는 리액트》 온라인 강의 자료 사이트.

## 콘텐츠 구조

문서는 노션을 원본으로 하되, **빌드 타임에 노션 API 를 호출하지 않는다.**
`scripts/scrape-notion.mjs` 가 노션을 마크다운으로 긁어 레포에 저장해 두고,
Next.js 는 그 파일만 읽어 정적으로 렌더링한다.

```
content/index.json          섹션·챕터 구조와 페이지 메타
content/<pageId>.md         페이지 본문 마크다운
public/content-images/      본문에 포함된 이미지 (노션 S3 URL 은 만료되므로 내려받아 둔다)
```

## 문서 갱신하기

노션 원본을 고쳤다면 다시 긁어서 커밋한다.

```bash
npm run scrape          # 새 페이지만 받는다 (중단됐다면 이어받기)
FORCE=1 npm run scrape  # 전체 다시 받기
LIMIT=5 npm run scrape  # 앞의 5개만 (동작 확인용)
```

노션 비공개 API 를 쓰기 때문에 API 키는 필요 없지만, 연속 호출에 429 가 잘 뜬다.
스크립트가 백오프하며 재시도하고, 중간에 끊겨도 다시 실행하면 남은 페이지부터 이어받는다.

긁어온 마크다운의 규칙만 손봤다면 노션을 다시 긁지 않고 아래로 기존 파일에 반영한다.

```bash
node scripts/fix-markdown.mjs
```

## 개발

```bash
npm install --legacy-peer-deps
npm run dev
npm run build
```
