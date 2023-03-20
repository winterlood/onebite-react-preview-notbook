import MenuIcon from "@mui/icons-material/Menu";
import { MenuButtonWrapper } from "./MenuButton.style";

interface Props {
  toggleMenu: () => void;
}

export function MenuButton(props: Props) {
  return (
    <MenuButtonWrapper onClick={props.toggleMenu}>
      <MenuIcon />
    </MenuButtonWrapper>
  );
}
