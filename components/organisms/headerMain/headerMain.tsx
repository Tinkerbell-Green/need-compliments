import {PencilFill} from "@styled-icons/bootstrap";
import {Menu} from "@styled-icons/boxicons-regular";
import {TargetEdit} from "@styled-icons/fluentui-system-filled";
import Link from "next/link";
import * as S from "./headerMain.styled";
import {Icon} from "components/atoms/icon";
import {Logo} from "components/atoms/logo"
import {SettingIcon} from "components/moleculs/settingIcon"

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
        <S.NavPart>
        </S.NavPart>
        <S.NavPart>
          <S.More>
            <Link href={"/goals"} passHref>
              <S.NavItem><Icon><TargetEdit/></Icon></S.NavItem>
            </Link>
            <Link href={"/setting"} passHref>
              <S.NavItem><SettingIcon rotate/></S.NavItem>
            </Link>
          </S.More>
          <Link href={"/"} passHref>
            <S.NavItem><Icon><PencilFill size={20}/></Icon></S.NavItem>
          </Link>
          <S.NavItem onClick={onMenuOpen}><Icon><Menu /></Icon></S.NavItem>
        </S.NavPart>
      </S.Nav>
    </S.Header>
  )
};
