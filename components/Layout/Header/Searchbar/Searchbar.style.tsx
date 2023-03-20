import styled from "@emotion/styled";
import { breakpoint } from "lib/breakpoint";

export const SearchBarWrapper = styled("div")`
  @media (max-width: ${breakpoint.tablet}) {
    display: none;
  }

  flex: 1;
  background-color: var(--bg-opacity-color);
  border-radius: 20px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1.2rem;

  svg {
    font-size: var(--font-small);
    color: var(--fg-opacity-color);
  }
  cursor: pointer;
`;

export const SearchText = styled("div")`
  width: 100%;
  color: var(--fg-opacity-color);

  &:hover {
  }
`;
