import React from "react"
import * as S from "./layout-main.styled"

export type LayoutMainProps = {
  children: React.ReactNode
}

export const LayoutMain = ({
  children,
}: LayoutMainProps) => {
  return (
    <S.LayoutMain>
      <S.Contents>
        {children}
      </S.Contents>
    </S.LayoutMain>   
  )
}
