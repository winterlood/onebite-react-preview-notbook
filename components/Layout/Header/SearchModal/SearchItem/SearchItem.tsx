import { Chapter } from "types/content";
import { useRouter } from "next/router";
import {
  SearchItemWrapper,
  SectionTitle,
  ChapterTitle,
  MatchedString,
} from "./SearchItem.style";

interface Props extends Chapter {
  search: string;
}

export default function SearchItem(props: Props) {
  const router = useRouter();
  const { search, id, title, section_title, section_index } = props;

  if (!search || !title) return null;

  const matchString = title
    .toLowerCase()
    .split(new RegExp(`(${search.toLowerCase()})`, "gi"));

  if (!Array.isArray(matchString)) return null;

  const onClickItem = () => {
    router.push(`/${id}`);
  };

  return (
    <SearchItemWrapper onClick={onClickItem}>
      <SectionTitle>{section_title}</SectionTitle>
      <ChapterTitle>
        {matchString.map((string, index) =>
          string.toLowerCase() === search.toLowerCase() ? (
            <MatchedString key={index}>{string}</MatchedString>
          ) : (
            string
          )
        )}
      </ChapterTitle>
    </SearchItemWrapper>
  );
}
