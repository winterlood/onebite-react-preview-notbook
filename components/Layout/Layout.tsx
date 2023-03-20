import {
  HeaderWrapper,
  LayoutWrapper,
  MainWrapper,
  SidebarWrapper,
} from "./Layout.style";
import Sidebar from "components/Layout/Sidebar";
import Header from "components/Layout/Header";
import Article from "./Article";

export default function Layout() {
  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <MainWrapper>
        <Article />
      </MainWrapper>
    </LayoutWrapper>
  );
}
