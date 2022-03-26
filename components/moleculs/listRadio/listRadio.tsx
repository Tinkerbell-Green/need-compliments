import React, {useCallback} from "react";
import {ListItemRadio, ListItemRadioProps} from "../listItemRadio";
import * as S from "./listRadio.styled";

export type ListRadioProps<ValueType = string> = {
  name: string
  data: Omit<ListItemRadioProps<ValueType>, "name" | "onClick" | "checked">[];
  value: ValueType
  onChange?: (value: ValueType) => void
};

export const ListRadio = <ValueType extends string>({
  data,
  name,
  value,
  onChange,
}: ListRadioProps<ValueType>) => {
  const handleClick = useCallback((value: ValueType)=>{
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
