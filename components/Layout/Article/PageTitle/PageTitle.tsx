import {
  PageTitleWrapper,
  StyledBanner,
  StyledTitle,
  StyledA,
  StyledSpan,
  StyledAlert,
} from "./PageTitle.style";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import { StyledLink } from "./PageTitle.style";

interface Props {
  recordMap: ExtendedRecordMap;
}

export default function PageTitle(props: Props) {
  const { recordMap } = props;

  return (
    <PageTitleWrapper>
      <StyledTitle>{getPageTitle(recordMap)}</StyledTitle>
      {/* <StyledBanner>
        <StyledAlert>
          <StyledSpan>이 페이지는 도서</StyledSpan>&nbsp;
          <StyledLink href={`/5ce0c0c2a7864c71992576e53182cc1f`}>
            한 입 크기로 잘라먹는 리액트
          </StyledLink>
          &nbsp;
          <StyledSpan>
            의 일부를 열람할 수 있도록 무료로 제공되는 페이지입니다.
          </StyledSpan>
        </StyledAlert>
      </StyledBanner> */}
      <StyledBanner>
        <StyledAlert>
          <StyledSpan>강의로 들으시려면</StyledSpan>
          &nbsp;
          <StyledLink href={`/2c1fc37a61a6486fb6f8ec72978a76dc`}>
            (인프런)한 입 크기로 잘라먹는 리액트 10% 쿠폰 받기 (기간
            한정)
          </StyledLink>
        </StyledAlert>
      </StyledBanner>
    </PageTitleWrapper>
  );
}
