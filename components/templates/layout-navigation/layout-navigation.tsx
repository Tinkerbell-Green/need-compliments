import {PlusSm} from "@styled-icons/heroicons-outline";
import {KeyboardArrowLeft} from "@styled-icons/material-twotone";
import React,{useCallback,useState} from "react";
import * as S from "./layout-navigation.styled";
import {HeaderMain} from "components/organisms/headerMain"
import {SidebarSetting} from "components/organisms/sidebarSetting";

export type LayoutNavigationProps = {
  children: React.ReactNode;
  title: string;
  rightButtonText?: string;
  onLeftButtonClick: () => void;
  onRightButtonClick?: () => void;
};

export const LayoutNavigation = ({
  children,
  title,
  rightButtonText,
  onLeftButtonClick,
  onRightButtonClick,
}: LayoutNavigationProps) => {
  const getRightButtonIcon = (text: string): React.ReactNode | string => {
    switch (text) {
    case "+": {
      return <PlusSm />;
    }
    default: {
      return text;
    }
    }
  };

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
    <S.LayoutNavigation>
      <HeaderMain onMenuOpen={handleOpenMenu}></HeaderMain>
      <S.Header>
        <S.LeftButton onClick={onLeftButtonClick}>
          <KeyboardArrowLeft></KeyboardArrowLeft>
        </S.LeftButton>
        <S.Title>{title}</S.Title>
        {!rightButtonText && <S.RightDiv></S.RightDiv>}
        {rightButtonText && onRightButtonClick && (
          <S.RightButton onClick={onRightButtonClick}>
            {getRightButtonIcon(rightButtonText)}
          </S.RightButton>
        )}
      </S.Header>
      <SidebarSetting
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
      ></SidebarSetting>
      <S.Content>{children}</S.Content>
    </S.LayoutNavigation>
  );
};
