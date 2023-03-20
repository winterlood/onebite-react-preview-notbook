import { Portal } from "@mui/material";
import Sidebar from "components/Layout/Sidebar";
import { MobileMenuWrapper } from "./MobileMenu.style";

interface Props {
  isMenuOpen: boolean;
}

export default function MobileMenu(props: Props) {
  if (!props.isMenuOpen) return null;
  return (
    <Portal>
      <MobileMenuWrapper>
        <Sidebar />
      </MobileMenuWrapper>
    </Portal>
  );
}
