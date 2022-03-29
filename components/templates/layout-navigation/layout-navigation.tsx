import React from "react"
import * as S from "./layout-navigation.styled";
import {HeaderMain} from "components/organisms/headerMain"

export type LayoutNavigationProps = {
  children: React.ReactNode;
};

export const LayoutNavigation = ({
  children,
}: LayoutNavigationProps) => {
  

  return (
    <S.LayoutNavigation>
      <HeaderMain />
      <S.Content>
        {children}
      </S.Content>
    </S.LayoutNavigation>
  );
};