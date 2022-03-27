import {PlusSm} from "@styled-icons/heroicons-outline";
import {KeyboardArrowLeft} from "@styled-icons/material-twotone";
import React from "react";
import * as S from "./layout-navigation.styled";

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

  return (
    <S.LayoutNavigation>
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
      <S.Content>{children}</S.Content>
    </S.LayoutNavigation>
  );
};