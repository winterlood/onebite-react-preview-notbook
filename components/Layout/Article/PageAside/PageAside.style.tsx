import styled from "@emotion/styled";

export const PageAsideWrapper = styled("div")`
  margin: 2rem 0rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  img {
    border-radius: 5px;
  }
`;

export const Description = styled("span")`
  padding: 0.5rem;
  color: var(--fg-opacity-color);
  font-family: medium;
  font-size: var(--font-small);
`;
