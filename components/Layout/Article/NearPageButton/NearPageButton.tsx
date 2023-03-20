import {
  ContentWrapper,
  NearPageButtonWrapper,
  StyledLink,
  StyledSpan,
} from "./NearPageButton.style";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Chapter } from "types/content";
import { useRouter } from "next/router";

interface Props extends Chapter {
  type: "PREV" | "NEXT";
}
export default function NearPageButton(props: Props) {
  const router = useRouter();
  const { type, title, id } = props;

  const onClickItem = () => {
    router.push(`/${id}`);
  };

  return (
    <NearPageButtonWrapper onClick={onClickItem} type={type}>
      {type === "PREV" && <ArrowBackIosIcon />}
      <ContentWrapper>
        <StyledSpan>{type}</StyledSpan>
        <StyledLink>{title}</StyledLink>
      </ContentWrapper>
      {type === "NEXT" && <ArrowForwardIosIcon />}
    </NearPageButtonWrapper>
  );
}
