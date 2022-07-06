import {Menu} from "@styled-icons/boxicons-regular";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState,useCallback, memo,useMemo} from "react";
import * as S from "./headerMain.styled";
import {Icon} from "components/atoms/icon";
import {Logo} from "components/atoms/logo";
import {SidebarSetting} from "components/organisms/sidebarSetting";
import {useDataSaga, DataActionType} from "stores/data";

const HeaderMain = () => {
  const router = useRouter();
  const {data: loggedInUserData} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA, [])
  const loggedInUserId = useMemo(()=>loggedInUserData?.user.userId,[loggedInUserData]);
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
        <Link href={"/"} passHref>
          <S.NavItem className={router.pathname==="/" ? "active" : ""}>홈</S.NavItem>
        </Link>
        {loggedInUserId ? <S.NavPart>
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

HeaderMain.displayName="HeaderMain"
export default memo(HeaderMain)