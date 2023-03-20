import { Chapter } from "types/content";
import { useContext } from "react";
import { SearchResultContext } from "../SearchModal";
import SearchItem from "../SearchItem";
import { SearchResultWrapper } from "./SearchResult.style";

export default function SearchResult() {
  const searchResult = useContext(SearchResultContext);
  if (!searchResult) return <></>;

  const { search, chapters } = searchResult;

  return (
    <SearchResultWrapper>
      {chapters.map((chapter) => (
        <SearchItem
          key={`search-result-${chapter.id}`}
          search={search}
          {...chapter}
        />
      ))}
    </SearchResultWrapper>
  );
}
