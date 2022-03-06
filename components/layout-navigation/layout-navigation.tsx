import {KeyboardArrowLeft} from "@styled-icons/material-twotone";
import React from "react";
import * as S from "./layout-navigation.styled";

export type LayoutNavigationProps = {
  children: React.ReactNode;
  title: string;
  rightButtonText?: string;
  onLeftButtonClick: () => void;
};

export const LayoutNavigation = ({
  children,
  title,
  rightButtonText,
  onLeftButtonClick,
}: LayoutNavigationProps) => {
  return (
    <S.LayoutNavigation>
      <S.Header>
        <S.LeftButton onClick={onLeftButtonClick}>
          <KeyboardArrowLeft></KeyboardArrowLeft>
        </S.LeftButton>
        <S.Title>{title}</S.Title>
        <S.RightButton>{rightButtonText}</S.RightButton>
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.LayoutNavigation>
  );
};
