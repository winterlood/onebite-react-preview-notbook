import {
  useContext,
  useState,
  useMemo,
  useTransition,
  createContext,
} from "react";
import {
  SearchModalWrapper,
  StyledModal,
  StyledModalInner,
  SearchBarWrapper,
  SearchInput,
  SearchResultWrapper,
} from "./SearchModal.style";
import { PageContext } from "pages/[[...slug]]";
import SearchIcon from "@mui/icons-material/Search";
import { Chapter } from "types/content";
import SearchResult from "./SearchResult";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

interface SearchResult {
  search: string;
  chapters: Chapter[];
}

export const SearchResultContext = createContext<SearchResult | null>(null);

export default function SearchModal(props: Props) {
  const { sections } = useContext(PageContext);
  const [_, setTransition] = useTransition();
  const [search, setSearch] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransition(() => {
      setSearch(e.target.value);
    });
  };

  const retrievedChapters = useMemo(() => {
    if (search === "") return [];
    const chapters = sections.map((section) => section.chapters).flat();
    return chapters.filter((chapter) => {
      const lowerTitle = chapter.title.toLowerCase();
      const lowerSearch = search.toLowerCase();
      return lowerTitle.includes(lowerSearch);
    });
  }, [search, sections]);

  const searchResult = useMemo(() => {
    return {
      search,
      chapters: retrievedChapters,
    };
  }, [search, retrievedChapters]);

  return (
    <SearchResultContext.Provider value={searchResult}>
      <SearchModalWrapper>
        <StyledModal open={props.isOpen} onClose={props.closeModal}>
          <StyledModalInner>
            <SearchBarWrapper>
              <SearchIcon />
              <SearchInput
                placeholder="챕터 제목으로 검색"
                onChange={onChangeInput}
              />
            </SearchBarWrapper>
            <SearchResultWrapper>
              <SearchResult />
            </SearchResultWrapper>
          </StyledModalInner>
        </StyledModal>
      </SearchModalWrapper>
    </SearchResultContext.Provider>
  );
}
