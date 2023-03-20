import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import { scrollbar } from "lib/scrollbar";

export const SearchModalWrapper = styled("div")``;

export const StyledModal = styled(Modal)`
  position: "absolute" as "absolute";
  box-shadow: 24;
`;

export const StyledModalInner = styled("div")`
  background-color: var(--bg-color);
  position: absolute;
  top: 30%;
  left: 50%;
  width: 90%;
  max-width: 700px;
  transform: translate(-50%, -30%);
  flex-direction: column;
  border-radius: 10px;

  display: flex;
`;

export const SearchBarWrapper = styled("div")`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  border-bottom: 2px solid var(--bg-opacity-color);

  svg {
    color: var(--primary-color);
    font-size: var(--font-h2);
  }
`;

export const SearchInput = styled("input")`
  flex: 1;
  background-color: transparent;
  border: none;
  color: var(--fg-color);

  font-size: var(--font-h2);

  &::placeholder {
    color: var(--fg-opacity-color);
  }

  &:focus {
    outline: none;
    border: 0px;
    text-decoration: none;
  }
`;

export const SearchResultWrapper = styled("div")`
  height: 60vh;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1.5rem;

  ${scrollbar}
`;
