import React from "react"
import * as S from "./layout-main.styled"
import {HeaderMain} from "components/organisms/headerMain"

export type LayoutMainProps = {
  children: React.ReactNode,
}

export const LayoutMain = ({
  children,
}: LayoutMainProps) => {
  return (
    <S.LayoutMain>
      <HeaderMain />   
      <S.Contents>
        {children}
      </S.Contents>
    </S.LayoutMain>
  );
}
