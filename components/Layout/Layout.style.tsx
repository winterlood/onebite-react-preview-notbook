import styled from "@emotion/styled";
import { breakpoint } from "lib/breakpoint";
import {
  ASIDE_WIDTH,
  HEADER_HEIGHT,
  PAGE_LEFT_PADDING,
  PAGE_RIGHT_PADDING,
} from "lib/layout";
import { scrollbar } from "lib/scrollbar";

export const LayoutWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled("header")`
  height: 64px;
  z-index: 10;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;

  padding-left: ${PAGE_LEFT_PADDING};
  padding-right: ${PAGE_RIGHT_PADDING};
  border-bottom: 1px solid var(--bg-opacity-color);
`;

export const SidebarWrapper = styled("aside")`
  z-index: 10;
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: ${ASIDE_WIDTH};
  overflow-y: scroll;
  border-right: 1px solid var(--bg-opacity-color);

  padding-right: 0.5rem;
  @media (max-width: ${breakpoint.desktop}) {
    display: none;
  }

  ${scrollbar}
`;

export const MainWrapper = styled("main")`
  flex: 1;
  padding-top: ${HEADER_HEIGHT};
  padding-left: ${ASIDE_WIDTH};

  @media (max-width: ${breakpoint.desktop}) {
    padding-left: 0;
  }
`;
