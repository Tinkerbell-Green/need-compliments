import {Book, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClosed,BookDead} from "@styled-icons/fa-solid";
import React, {useCallback} from "react";
import * as S from "./listItemRadio.styled";
import {GoalData} from "stores/data";

export type PublicBookIcon = GoalData["readPermission"] | null;

export type ListItemRadioProps<ValueType = string> = {
  name: string;
  title: string;
  value: ValueType;
  publicBookIcon: PublicBookIcon;
  checked: boolean;
  onClick: (value: ValueType) => void; // 뭘 클릭했는지 부모한테 알려주기 위해서
};

export const ListItemRadio = <ValueType extends string>({
  title,
  name,
  value,
  publicBookIcon,
  onClick,
  checked,
}: ListItemRadioProps<ValueType>) => {
  const getpublicBookIcon = (
    publicBookIcon: PublicBookIcon
  ): React.ReactNode | null => {
    switch (publicBookIcon) {
    case "everyone": {
      return <Book />;
    }
    case "me": {
      return <BookClosed />;
    }
    case "none": {
      return <BookDead />;
    }
    default: {
      return null;
    }
    }
  };

  const handleClick = useCallback(()=>{
    onClick(value)
  },[onClick, value])

  const inputId = `input-id-${name}-${value}`

  return (
    <S.RadioContainer onClick={handleClick}>
      <S.RadioIconAndLabel>
        {publicBookIcon && (
          <S.PublicBookIconContainer>
            {getpublicBookIcon(publicBookIcon)}
          </S.PublicBookIconContainer>
        )}
        <S.Label htmlFor={inputId}>{title}</S.Label>
      </S.RadioIconAndLabel>
      <S.Input type="radio" id={inputId} name={name} value={value} checked={checked}/>
    </S.RadioContainer>
  );
};
