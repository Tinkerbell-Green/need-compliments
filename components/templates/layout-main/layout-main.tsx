import React from "react"
import * as S from "./layout-main.styled"

export type LayoutMainProps = {
  children: React.ReactNode,
  header? : React.ReactNode,
  sidebar? : React.ReactNode,
}

export const LayoutMain = ({
  children,
  header,
  sidebar,
}: LayoutMainProps) => {
  return (
    <S.LayoutMain>
      {header && header}
      {sidebar && sidebar}
      <S.Contents>
        {children}
      </S.Contents>
    </S.LayoutMain>   
  )
}
