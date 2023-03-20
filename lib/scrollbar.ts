import { css } from "@emotion/react";

export const scrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--bg-opacity-color);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }
`;
