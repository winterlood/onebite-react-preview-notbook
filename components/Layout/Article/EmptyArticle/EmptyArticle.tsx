import {
  EmptyArticleWrapper,
  StyledDescript,
  StyledTtile,
} from "./EmptyArticle.style";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export default function EmptyArticle() {
  return (
    <EmptyArticleWrapper>
      <ErrorOutlineIcon />
      <br />
      <StyledTtile>404: 잘못된 링크입니다.</StyledTtile>
      <StyledDescript>메뉴를 통해 정상적인 페이지로 접근하세요</StyledDescript>
    </EmptyArticleWrapper>
  );
}
