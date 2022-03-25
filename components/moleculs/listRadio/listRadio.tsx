import React, {useCallback} from "react";
import {ListItemRadio, ListItemRadioProps} from "../listItemRadio";
import * as S from "./listRadio.styled";

export type ListRadioProps = {
  name: string
  data: Omit<ListItemRadioProps, "name" | "onClick" | "checked">[];
  value: string
  onChange?: (value: string) => void
};

export const ListRadio = ({
  data,
  name,
  value,
  onChange,
}: ListRadioProps) => {
  const handleClick = useCallback((value: string)=>{
    onChange?.(value)
  },[onChange])

  return (
    <S.ListRadio>
      {data.map((listItem) => (
        <ListItemRadio
          key={`${name}-${listItem.value}`}
          name={name}
          value={listItem.value}
          title={listItem.title}
          publicBookIcon={listItem.publicBookIcon}
          checked={value === listItem.value}
          onClick={handleClick}
        ></ListItemRadio>
      ))}
    </S.ListRadio>
  );
};
