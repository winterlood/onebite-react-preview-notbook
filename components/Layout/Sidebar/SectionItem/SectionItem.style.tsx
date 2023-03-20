import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";

export const SectionItemWrapper = styled("div")``;

export const StyledAccordion = styled(Accordion)<{ isSelected: boolean }>`
  background-color: var(--bg-color);
  padding-left: 0px;
  color: var(--fg-color);
  box-shadow: none;

  /* 현재 선택된 아코디언 백그라운드 색 부여 */
  ${(props) =>
    props.isSelected &&
    css`
      .MuiAccordionSummary-root {
        background-color: var(--primary-tinted-color);
      }
      p {
        color: var(--primary-color);
      }
      .MuiAccordionSummary-expandIconWrapper {
        color: var(--primary-color) !important;
      }
    `}

  /* 아코디언 헤더 */
  .MuiAccordionSummary-root {
    min-height: 46px;
    border-radius: 0px !important;
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
  }

  /* 아코디언 텍스트 */
  p {
    font-size: var(--font-small);
    font-weight: bold;
    word-break: keep-all;
  }

  /* 아코디언 콘텐츠 */
  .MuiAccordionSummary-content {
    margin: 0px !important;
  }

  /* 아코디언 아이콘 래퍼 */
  .MuiAccordionSummary-expandIconWrapper {
    color: var(--fg-icon-color);
  }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin-left: 1rem;
  border-left: 1px solid var(--bg-opacity-color);
`;
