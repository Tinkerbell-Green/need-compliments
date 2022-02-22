import React from "react"
import * as S from "./layout-navigation.styled"

export type LayoutNavigationProps = {
  children: React.ReactNode
  title: string
}

export const LayoutNavigation = ({
  children,
  title
}: LayoutNavigationProps) => {
  return (
    <S.LayoutNavigation>
      <S.Header>
        <S.LeftButton>{"<"}</S.LeftButton>
        <S.Title>{title}</S.Title>
        <S.RightButton>{""}</S.RightButton>
      </S.Header>
      <S.Content>
        {children}
      </S.Content>
    </S.LayoutNavigation>   
  )
}