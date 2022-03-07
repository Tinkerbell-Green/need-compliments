import React from "react";
import * as S from "./subHeadingButton.styled";

type SubHeadingButtonPros = {
  children: React.ReactNode;
};

export const SubHeadingButton = ({children}: SubHeadingButtonPros) => (
  <S.SubHeadingButton>{children}</S.SubHeadingButton>
);
