import styled from "@emotion/styled";
import { NotionRenderer } from "react-notion-x";
import { breakpoint } from "lib/breakpoint";
import { ARTICLE_HORIZON_PADDING, ARTICLE_VERTICAL_PADDING } from "lib/layout";

export const ArticleWrapper = styled("article")`
  padding: ${ARTICLE_HORIZON_PADDING} ${ARTICLE_VERTICAL_PADDING};
  min-height: none;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const StyledNotionRenderer = styled(NotionRenderer)`
  display: flex;
  min-height: 0px !important;
  main {
    width: 100% !important;
  }
  .notion-page-scroller {
    min-height: inherit !important;
    .notion-page {
      padding: 0px;
    }
    .notion-page-no-cover {
      margin-top: 0px !important;
    }
  }

  .notion-page-content-has-aside {
    display: flex;
    gap: 5rem;
    .notion-page-content-inner {
      flex: 1;
      max-width: none;
    }
    .notion-aside {
      flex: none;
    }
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
