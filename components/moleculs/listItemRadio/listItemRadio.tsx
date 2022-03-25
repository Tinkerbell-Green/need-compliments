import {Book, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClosed} from "@styled-icons/fa-solid";
import React, {useCallback} from "react";
import * as S from "./listItemRadio.styled";

export type PublicBookIcon = "public" | "protected" | "private" | null;

export type ListItemRadioProps = {
  name: string;
  title: string;
  value: string;
  publicBookIcon: PublicBookIcon;
  checked: boolean;
  onClick: (value: string) => void; // 뭘 클릭했는지 부모한테 알려주기 위해서
};

export const ListItemRadio = ({
  title,
  name,
  value,
  publicBookIcon,
  onClick,
  checked,
}: ListItemRadioProps) => {
  const getpublicBookIcon = (
    publicBookIcon: PublicBookIcon
  ): React.ReactNode | null => {
    switch (publicBookIcon) {
    case "public": {
      return <Book />;
    }
    case "protected": {
      return <BookHalf />;
    }
    case "private": {
      return <BookClosed />;
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
