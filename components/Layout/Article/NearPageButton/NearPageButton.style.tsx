import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const NearPageButtonWrapper = styled("div")<{ type: "PREV" | "NEXT" }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  color: var(--fg-color);
  padding: 0.8rem 2.5rem;
  border-radius: 10px;

  ${({ type }) =>
    type === "PREV"
      ? css`
          text-align: left;
          justify-content: flex-start;
        `
      : css`
          text-align: right;
          justify-content: flex-end;
        `}

  &:hover {
    background-color: var(--bg-opacity-color);
  }

  svg {
    font-size: var(--font-small);
  }
`;

export const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const StyledSpan = styled("span")`
  display: block;
  font-size: var(--font-small);
`;

export const StyledLink = styled("span")`
  display: block;
  color: var(--primary-color);
  font-size: var(--font);
  font-weight: bold;
`;
