import styled from "@emotion/styled";
import { breakpoint } from "lib/breakpoint";
import { HEADER_HEIGHT } from "lib/layout";

export const MenuButtonWrapper = styled("div")`
  @media (min-width: ${breakpoint.desktop}) {
    display: none;
  }

  cursor: pointer;
  color: var(--fg-color);
`;
