import { Menu } from "types/content";
import { MenuItemWrapper } from "./MenuItem.style";
import { useRouter } from "next/router";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
export default function MenuItem(props: Menu) {
  const router = useRouter();

  const onClickMenu = () => {
    if (props.type === "INNER") {
      router.push(`/${props.id}`);
    } else {
      window.open(props.url);
    }
  };

  const caclIsSelected = () => {
    if (props.type === "INNER") {
      const path = router.asPath.replace("/", "");
      return path === props.id;
    } else return false;
  };

  const isSelected = caclIsSelected();

  return (
    <MenuItemWrapper isSelected={isSelected} onClick={onClickMenu}>
      {props.title}
      {props.type === "EXTERNAL" && <ArrowOutwardIcon />}
    </MenuItemWrapper>
  );
}
