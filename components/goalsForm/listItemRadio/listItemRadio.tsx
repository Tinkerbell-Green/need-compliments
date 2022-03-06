import { Book, BookHalf } from "@styled-icons/bootstrap";
import { Book as BookClosed } from "@styled-icons/fa-solid";
import React from "react";
import * as S from "./listItemRadio.styled";

export type PublicBookIcon = "public" | "protected" | "private" | null;

export type ListItemRadioProps = {
  id: number;
  title: string;
  publicEyeIcon: PublicBookIcon;
  onChange?: (value: string) => void; // 뭘 클릭했는지 부모한테 알려주기 위해서
};

export const ListItemRadio = ({
  id,
  title,
  publicEyeIcon,
}: ListItemRadioProps) => {
  const getpublicBookIcon = (
    publicEyeIcon: PublicBookIcon
  ): React.ReactNode | null => {
    switch (publicEyeIcon) {
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

  return (
    <S.RadioContainer>
      <S.RadioIconAndLabel>
        {publicEyeIcon && (
          <S.PublicBookIconContainer>
            {getpublicBookIcon(publicEyeIcon)}
          </S.PublicBookIconContainer>
        )}
        <S.Label htmlFor="quit">{title}</S.Label>
      </S.RadioIconAndLabel>
      <S.Input type="radio" id="quit" name="publicSetting" value={title} />
    </S.RadioContainer>
  );
};
