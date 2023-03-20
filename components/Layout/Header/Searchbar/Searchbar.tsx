import { SearchBarWrapper, SearchText } from "./Searchbar.style";
import SearchIcon from "@mui/icons-material/Search";
interface Props {
  onClick: () => any;
}

export default function SearchBar(props: Props) {
  return (
    <SearchBarWrapper onClick={props.onClick}>
      <SearchIcon />
      <SearchText>Search</SearchText>
    </SearchBarWrapper>
  );
}
