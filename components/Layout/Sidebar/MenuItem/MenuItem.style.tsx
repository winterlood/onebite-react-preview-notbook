import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MenuItemWrapper = styled("div")<{ isSelected: boolean }>`
  font-size: var(--font-small);
  font-weight: bold;
  color: var(--fg-color);
  padding: 0.8rem;
  padding-left: 1rem;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    color: var(--fg-opacity-color);
    font-size: var(--font-small);
  }

  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  &:hover {
    background-color: var(--bg-opacity-color);
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: var(--primary-tinted-color) !important;
      color: var(--primary-color);
    `}
`;
