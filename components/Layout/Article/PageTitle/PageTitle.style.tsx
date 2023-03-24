import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import Link from "next/link";

export const PageTitleWrapper = styled("div")`
  padding-top: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--bg-opacity-color);
`;

export const StyledTitle = styled("div")``;

export const StyledBanner = styled("div")`
  padding-top: 1rem;
  font-size: var(--font);
`;

export const StyledSpan = styled("span")``;

export const StyledLink = styled(Link)`
  color: var(--primary-color);
  font-family: bold;
  text-decoration: none;
`;

export const StyledA = styled("a")`
  color: var(--primary-color);
  font-family: bold;
`;

export const StyledAlert = styled(Alert)`
  background-color: var(--primary-tinted-color);
  color: var(--fg-color);
  font-size: var(--font-small);
  font-family: medium;
  svg {
    color: var(--primary-color);
  }
`;
