import React from "react";
import * as S from "./subHeadingButton.styled";

type SubHeadingButtonPros = {
  children: React.ReactNode;
  onClick: () => void;
};

export const SubHeadingButton = ({children, onClick}: SubHeadingButtonPros) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <S.SubHeadingButton onClick={handleClick}>{children}</S.SubHeadingButton>
  );
};
