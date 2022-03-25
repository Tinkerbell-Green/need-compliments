import React from "react";
import * as S from "./subHeadingSpan.styled";

type SubHeadingSpanPros = {
  children: React.ReactNode;
};

export const SubHeadingSpan = ({children}: SubHeadingSpanPros) => (
  <S.SubHeadingSpan>{children}</S.SubHeadingSpan>
);
