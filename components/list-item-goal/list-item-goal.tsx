import React from "react";
import * as S from "./list-item-goal.styled";

type ListItemGoal = {
  children: React.ReactNode;
  color?:string;
  leftComponent?: React.ReactNode,
  rightComponent?: React.ReactNode,
}

export const ListItemGoal = ({
  children,
  color,
  leftComponent,
  rightComponent
}:ListItemGoal) => {
  return (
    <S.ListItem color={color}>
      <S.Left>{leftComponent}</S.Left>
      {children}
      <S.Right>{rightComponent}</S.Right>
    </S.ListItem>
  )
}
