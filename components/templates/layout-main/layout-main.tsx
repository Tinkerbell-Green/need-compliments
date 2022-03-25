import React from "react"
import * as S from "./layout-main.styled"
import {HeaderMain} from "components/organisms/headerMain";

export type LayoutMainProps = {
  children: React.ReactNode,
  name:string,
  onMenuOpen : React.MouseEventHandler,
}

export const LayoutMain = ({
  children,
  name,
  onMenuOpen,
}: LayoutMainProps) => {
  return (
    <S.LayoutMain>
      <HeaderMain name={name} onMenuOpen={onMenuOpen}></HeaderMain>
      <S.Contents>
        {children}
      </S.Contents>
    </S.LayoutMain>   
  )
}
