import {
  SectionItemWrapper,
  StyledAccordion,
  StyledAccordionDetails,
} from "./SectionItem.style";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Section } from "types/content";
import { useContext } from "react";
import { PageContext } from "../../../../pages/[[...slug]]";
import Link from "next/link";
import ChapterItem from "../ChapterItem";

interface Props extends Section {
  isSelected: boolean;
  onClickSection: (sectionIndex: number) => void;
}

export default function SectionItem(props: Props) {
  const { pageID } = useContext(PageContext);
  const { isSelected, title, index, chapters, onClickSection } = props;

  return (
    <SectionItemWrapper>
      <StyledAccordion
        isSelected={isSelected}
        TransitionProps={{ unmountOnExit: true }}
        expanded={isSelected}
        onChange={() => onClickSection(index)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          {chapters.map((chapter) => {
            const isSelected = chapter.id === pageID;
            return (
              <ChapterItem
                key={`chapter-${chapter.id}`}
                isSelected={isSelected}
                {...chapter}
              />
            );
          })}
        </StyledAccordionDetails>
      </StyledAccordion>
    </SectionItemWrapper>
  );
}
