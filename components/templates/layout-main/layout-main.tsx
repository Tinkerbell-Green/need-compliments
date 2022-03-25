import React from "react"
import * as S from "./layout-main.styled"
import {HeaderMain} from "components/organisms/headerMain";

export type LayoutMainProps = {
  children: React.ReactNode,
  onMenuOpen : React.MouseEventHandler,
}

export const LayoutMain = ({
  children,
  onMenuOpen,
}: LayoutMainProps) => {
  return (
    <S.LayoutMain>
      <HeaderMain onMenuOpen={onMenuOpen}></HeaderMain>
      <S.Contents>
        {children}
      </S.Contents>
    </S.LayoutMain>   
  )
}
