import {Menu} from "@styled-icons/feather";
import Link from "next/link";
import * as S from "./headerMain.styled";
import {Logo} from "components/atoms/logo"

type HeaderMainProps = {
  name:string,
  onMenuOpen : React.MouseEventHandler,
}

export const HeaderMain = ({
  name,
  onMenuOpen
}:HeaderMainProps) => {
  return (
    <S.Header>
      <Logo/>
      <S.Nav>
        <S.NavPart>
          <S.Profile>{name}님</S.Profile>
        </S.NavPart>
        <S.NavPart>
          <S.More>
            <Link href={"/goals"} passHref>
              <S.NavItem>목표 관리</S.NavItem>
            </Link>
            <Link href={"/setting"} passHref>
              <S.NavItem>설정</S.NavItem>
            </Link>
          </S.More>
          <S.MenuIcon onClick={onMenuOpen}><Menu /></S.MenuIcon>
        </S.NavPart>
      </S.Nav>
    </S.Header>
  )
};
