import { HeaderWrapper, Logo } from "./Header.style";
import SearchBar from "./Searchbar";
import { useRef, useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import { useRouter } from "next/router";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import ThemeChangeButton from "./ThemeChangeButton";
import config from "config/config.json";

export default function Header() {
  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const modalKey = useRef(0);
  const menuKey = useRef(0);

  useEffect(() => {
    if (isSearch) {
      closeModal();
    }
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [router.asPath]);

  const closeModal = () => {
    setIsSearch(false);
    modalKey.current += 1;
  };

  const toggleMenu = () => {
    const $body = document.querySelector("body") as HTMLBodyElement;
    setIsMenuOpen(!isMenuOpen);

    if (isMenuOpen) {
      $body.classList.remove("noscroll");
      menuKey.current += 1;
    } else {
      $body.classList.add("noscroll");
    }
  };

  const onClickLogo = () => {
    router.push("/");
  };

  return (
    <>
      <HeaderWrapper>
        <MenuButton toggleMenu={toggleMenu} />
        <Logo onClick={onClickLogo}>
          <Image alt="logosvg" src={`/logo.svg`} width={22} height={22} />
          {config.site}
        </Logo>
        <SearchBar onClick={() => setIsSearch(!isSearch)} />
        <ThemeChangeButton />
      </HeaderWrapper>
      <SearchModal
        key={`search-modal-${modalKey.current}`}
        isOpen={isSearch}
        closeModal={closeModal}
      />
      <MobileMenu
        key={`mobile-menu-${menuKey.current}`}
        isMenuOpen={isMenuOpen}
      />
    </>
  );
}
