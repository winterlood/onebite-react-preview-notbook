import styled from "@emotion/styled";

export const PageAsideWrapper = styled("div")`
  margin: 2rem 0rem;
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-radius: 5px;

  img {
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export const Description = styled("span")`
  padding: 0.5rem;
  color: var(--fg-opacity-color);
  font-family: medium;
  font-size: var(--font-small);
`;
