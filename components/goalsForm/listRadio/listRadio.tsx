import React from "react";
import {ListItemRadio, ListItemRadioProps} from "../listItemRadio";
import * as S from "./listRadio.styled";

type ListRadioProps = {
  data: ListItemRadioProps[];
};

export const ListRadio = ({data}: ListRadioProps) => {
  return (
    <S.ListRadio>
      {data.map((listItem) => (
        <ListItemRadio
          key={listItem.id}
          id={listItem.id}
          title={listItem.title}
          publicEyeIcon={listItem.publicEyeIcon}
        ></ListItemRadio>
      ))}
    </S.ListRadio>
  );
};
