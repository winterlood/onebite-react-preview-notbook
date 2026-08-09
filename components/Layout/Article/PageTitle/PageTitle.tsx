import {
  PageTitleWrapper,
  StyledBanner,
  StyledTitle,
  StyledA,
  StyledSpan,
  StyledAlert,
  StyledBoldSpan,
} from "./PageTitle.style";
import { StyledLink } from "./PageTitle.style";

interface Props {
  title?: string | null;
}

export default function PageTitle(props: Props) {
  const { title } = props;

  return (
    <PageTitleWrapper>
      <StyledTitle>{title}</StyledTitle>
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
          <StyledBoldSpan>한 입 크기로 잘라먹는 리액트의</StyledBoldSpan>
          &nbsp;
          <StyledSpan>강의 자료 입니다</StyledSpan>
          <br />
          <StyledA
            target="_blank"
            href={`https://product.kyobobook.co.kr/detail/S000201352991`}
          >
            도서로 보기
          </StyledA>
          &nbsp; &nbsp;
          <StyledA target="_blank" href={`https://link.onebitefe.com/r/5qkqq4`}>
            강의로 보기 (10% 할인쿠폰)
          </StyledA>
        </StyledAlert>
      </StyledBanner>
    </PageTitleWrapper>
  );
}
