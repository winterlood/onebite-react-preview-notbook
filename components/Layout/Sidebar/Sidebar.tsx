import {
  SectionWrapper,
  SectionLabel,
  SidebarWrapper,
  ProfileWrapper,
  StyledLicense,
} from "./Sidebar.style";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../../../pages/[[...slug]]";
import SectionItem from "./SectionItem";
import { Menu } from "types/content";
import MenuItem from "./MenuItem";
import config from "config/config.json";
import Profile from "./Profile";
import { StyledA } from "./Sidebar.style";
const appMenus: Menu[] = config.menus as Menu[];

export default function Sidebar() {
  const { sections, currentSection } = useContext(PageContext);

  const [expandedSectionIndex, setExpandedSectionIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (currentSection) {
      setExpandedSectionIndex(currentSection.index);
    }
  }, [currentSection]);

  const onClickSection = (sectionIndex: number) => {
    if (expandedSectionIndex === sectionIndex) {
      setExpandedSectionIndex(null);
    } else {
      setExpandedSectionIndex(sectionIndex);
    }
  };

  if (!sections) return <></>;
  return (
    <SidebarWrapper>
      <SectionWrapper>
        <SectionLabel>메뉴</SectionLabel>
        <MenuItem
          key={`menu-item-index}`}
          type={"INNER"}
          title={"🏠 홈"}
          id={""}
        />
        {appMenus.map((menu) => (
          <MenuItem key={`menu-item-${menu.title}`} {...menu} />
        ))}
      </SectionWrapper>
      <SectionWrapper>
        <SectionLabel>컨텐츠</SectionLabel>
        {sections.map((section) => {
          const isSelcted = section.index == expandedSectionIndex;
          return (
            <SectionItem
              key={`section-${section.index}`}
              isSelected={isSelcted}
              onClickSection={onClickSection}
              {...section}
            />
          );
        })}
      </SectionWrapper>
      <SectionWrapper>
        <SectionLabel>만든 사람</SectionLabel>
        <ProfileWrapper>
          <Profile />
        </ProfileWrapper>
      </SectionWrapper>
      <StyledLicense>
        2023 Copyrighted By
        <br />
        <StyledA href={"https://winterlood.com"} target={"_blank"}>
          @이정환-winterlood
        </StyledA>
      </StyledLicense>
    </SidebarWrapper>
  );
}
