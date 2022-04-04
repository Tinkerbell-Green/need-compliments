import {Menu} from "@styled-icons/boxicons-regular";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState,useCallback} from "react";
import * as S from "./headerMain.styled";
import {Icon} from "components/atoms/icon";
import {Logo} from "components/atoms/logo";
import {SidebarSetting} from "components/organisms/sidebarSetting";

export const HeaderMain = () => {
  const router = useRouter();
  const {status} = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpenMenu: React.MouseEventHandler = useCallback(() => {
    setIsMenuOpen(true);
  },[]);

  const handleCloseMenu: React.MouseEventHandler = useCallback((event) => {
    if (!(event.target as HTMLElement).closest(".menu")) {
      setIsMenuOpen(false);
    }
  },[]);

  return (
    <S.Header>
      <Logo/>
      <S.Nav>
        <S.NavPart></S.NavPart>
        {status==="authenticated" ? <S.NavPart>
          <S.More>
            <Link href={"/feed"} passHref>
              <S.NavItem className={router.pathname.includes("/feed") ? "active" : ""}>내 피드</S.NavItem>
            </Link>
            <Link href={"/goals"} passHref>
              <S.NavItem className={router.pathname.includes("/goals") ? "active" : ""}>목표</S.NavItem>
            </Link>
            <Link href={"/setting"} passHref>
              <S.NavItem className={router.pathname.includes("/setting") ? "active" : ""}>설정</S.NavItem>
            </Link>
          </S.More>
          <button onClick={handleOpenMenu} aria-label={"사이드바 열기"}><Icon aria-label={"Menu image"}><Menu /></Icon></button>
        </S.NavPart>
          : <Link href={"/auth/signin"} passHref>
            <S.NavItem>로그인/회원가입</S.NavItem>
          </Link>}
      </S.Nav>
      <SidebarSetting
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
      ></SidebarSetting>    
    </S.Header>
  )
};
