import React from "react";
import * as S from "./listItemRadio.styled";

export type ListItemRadioProps = {
  id: number;
  title: string;
  leftIcon: React.ReactNode;
  onChange?: (value: string) => void; // 뭘 클릭했는지 부모한테 알려주기 위해서
};

export const ListItemRadio = (props: ListItemRadioProps) => (
  <S.RadioContainer>
    {props.leftIcon}
    <label htmlFor="quit">{props.title}</label>
    <input type="radio" id="quit" name="" value={props.title} />
  </S.RadioContainer>
);
