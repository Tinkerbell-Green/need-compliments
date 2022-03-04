import {Eye, EyeOff} from "@styled-icons/heroicons-outline";
import React from "react";
import * as S from "./listItemRadio.styled";

export type LeftIcon = "open" | "close" | null;

export type ListItemRadioProps = {
  id: number;
  title: string;
  leftIcon: LeftIcon;
  onChange?: (value: string) => void; // 뭘 클릭했는지 부모한테 알려주기 위해서
};

export const ListItemRadio = ({id, title, leftIcon}: ListItemRadioProps) => {
  const getLeftIcon = (leftIcon: LeftIcon): React.ReactNode | null => {
    switch (leftIcon) {
    case "open": {
      return <Eye />;
    }
    case "close": {
      return <EyeOff />;
    }
    default: {
      return null;
    }
    }
  };

  return (
    <S.RadioContainer>
      {leftIcon && (
        <S.LeftIconContainer>{getLeftIcon(leftIcon)}</S.LeftIconContainer>
      )}
      <S.Label htmlFor="quit">{title}</S.Label>
      <S.Input type="radio" id="quit" name="publicSetting" value={title} />
    </S.RadioContainer>
  );
};
