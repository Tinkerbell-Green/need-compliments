import React from "react";
import * as S from "./subHeadingButton.styled";

type SubHeadingButtonPros = {
  children: React.ReactNode;
  onClick: () => void;
  status?: "error" | "default";
};

export const SubHeadingButton = ({
  children,
  onClick,
  status = "default",
}: SubHeadingButtonPros) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <S.SubHeadingButton status={status} onClick={handleClick}>
      {children}
    </S.SubHeadingButton>
  );
};
