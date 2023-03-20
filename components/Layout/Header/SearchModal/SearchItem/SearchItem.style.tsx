import styled from "@emotion/styled";

export const SearchItemWrapper = styled("div")`
  padding: 1rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  &:hover {
    background-color: var(--bg-opacity-color);
  }
`;

export const SectionTitle = styled("div")`
  color: var(--fg-opacity-color);
  font-size: var(--font-small);
  font-weight: bold;
`;

export const ChapterTitle = styled("div")`
  color: var(--fg-color);
  font-size: var(--font-large);
  font-weight: bold;
`;

export const MatchedString = styled("span")`
  color: var(--primary-color);
  background-color: var(--primary-tinted-color);
`;
