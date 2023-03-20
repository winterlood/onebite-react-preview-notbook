import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ChpaterItemWrapper = styled("div")<{ isSelected: boolean }>`
  cursor: pointer;
  padding-left: 1rem;
  min-height: 46px;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
  align-items: center;
  color: var(--fg-opcaity-color);
  font-size: var(--font-small);

  &:hover {
    background-color: var(--bg-opacity-color);
  }

  ${(props) =>
    props.isSelected &&
    css`
      color: var(--primary-color);
      background-color: var(--primary-tinted-color);
      font-weight: bold;
    `}
`;
