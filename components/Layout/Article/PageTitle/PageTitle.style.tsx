import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import Link from "next/link";

export const PageTitleWrapper = styled("div")`
  padding-top: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--bg-opacity-color);
`;

export const StyledTitle = styled("h1")`
  font-family: bold;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--fg-color);
  margin: 0;
  letter-spacing: -0.01em;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const StyledBanner = styled("div")`
  padding-top: 1rem;
  font-size: var(--font);
`;

export const StyledSpan = styled("span")``;
export const StyledBoldSpan = styled("span")`
  font-family: bold;
`;

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
