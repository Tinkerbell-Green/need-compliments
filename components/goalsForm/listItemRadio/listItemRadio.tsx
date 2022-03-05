import {Eye, EyeOff} from "@styled-icons/heroicons-outline";
import React from "react";
import * as S from "./listItemRadio.styled";

export type PublicEyeIcon = "open" | "close" | null;

export type ListItemRadioProps = {
  id: number;
  title: string;
  publicEyeIcon: PublicEyeIcon;
  onChange?: (value: string) => void; // 뭘 클릭했는지 부모한테 알려주기 위해서
};

export const ListItemRadio = ({
  id,
  title,
  publicEyeIcon,
}: ListItemRadioProps) => {
  const getpublicEyeIcon = (
    publicEyeIcon: PublicEyeIcon
  ): React.ReactNode | null => {
    switch (publicEyeIcon) {
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
      <S.RadioIconAndLabel>
        {publicEyeIcon && (
          <S.PublicEyeIconContainer>
            {getpublicEyeIcon(publicEyeIcon)}
          </S.PublicEyeIconContainer>
        )}
        <S.Label htmlFor="quit">{title}</S.Label>
      </S.RadioIconAndLabel>
      <S.Input type="radio" id="quit" name="publicSetting" value={title} />
    </S.RadioContainer>
  );
};
