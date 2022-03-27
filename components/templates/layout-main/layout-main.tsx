import React, {useState,useCallback} from "react"
import * as S from "./layout-main.styled"
import {HeaderMain} from "components/organisms/headerMain"
import {SidebarSetting} from "components/organisms/sidebarSetting";

export type LayoutMainProps = {
  children: React.ReactNode,
  onSnackbarShow? : ()=>void,
}

export const LayoutMain = ({
  children,
  onSnackbarShow,
}: LayoutMainProps) => {
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
    <S.LayoutMain>
      <HeaderMain onMenuOpen={handleOpenMenu}></HeaderMain>
      <SidebarSetting
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
      ></SidebarSetting>    
      <S.Contents>
        {children}
      </S.Contents>
    </S.LayoutMain>
  );
}
