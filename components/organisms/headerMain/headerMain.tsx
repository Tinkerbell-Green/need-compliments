import {Menu} from "@styled-icons/boxicons-regular";
import Link from "next/link";
import * as S from "./headerMain.styled";
import {Icon} from "components/atoms/icon";
import {Logo} from "components/atoms/logo";

type HeaderMainProps = {
  onMenuOpen : React.MouseEventHandler,
}

export const HeaderMain = ({
  onMenuOpen
}:HeaderMainProps) => {
  return (
    <S.Header>
      <Logo/>
      <S.Nav>
        <S.NavPart></S.NavPart>
        <S.NavPart>
          <S.More>
            <Link href={"/feed"} passHref>
              <S.NavItem>내 피드</S.NavItem>
            </Link>
            <Link href={"/goals"} passHref>
              <S.NavItem>목표</S.NavItem>
            </Link>
            <Link href={"/setting"} passHref>
              <S.NavItem>설정</S.NavItem>
            </Link>
          </S.More>
          <button onClick={onMenuOpen}><Icon><Menu /></Icon></button>
        </S.NavPart>
      </S.Nav>
    </S.Header>
  )
};
