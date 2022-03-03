import React from "react";
import * as S from "./list-item-goal.styled";

type ListItemGoal = {
  children: React.ReactNode;
  textColor?:string;
}

export const ListItemGoal = ({
  children,
  textColor
}:ListItemGoal) => {
  return (
    <S.ListItem color={textColor}>
      {children}
    </S.ListItem>
  )
}
