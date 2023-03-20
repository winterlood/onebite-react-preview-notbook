import styled from "@emotion/styled";

export const HeaderWrapper = styled("div")`
  background-color: var(--bg-color);
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  align-items: center;
`;

export const Logo = styled("div")`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-family: bold;
  padding: 0.5rem 0rem;
  border-radius: 20px;
  color: var(--fg-color);
  font-size: var(--font-small);

  svg {
    background-color: none;
  }
`;

export const MenuButtonWrapper = styled("div")`
  cursor: pointer;
  color: var(--fg-color);
`;
