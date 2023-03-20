import styled from "@emotion/styled";
import { HEADER_HEIGHT } from "lib/layout";
import { scrollbar } from "lib/scrollbar";

export const MobileMenuWrapper = styled("div")`
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  padding-bottom: 150px;

  opacity: 0.95;

  background-color: var(--bg-color);
  z-index: 10;

  overflow-y: scroll;
  ${scrollbar}
`;
