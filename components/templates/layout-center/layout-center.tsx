import React from "react";
import * as S from "./layout-center.styled";

export type LayoutCenterProps = {
  children: React.ReactNode;
};

export const LayoutCenter = ({children}: LayoutCenterProps) => (
  <S.LayoutCenter>{children}</S.LayoutCenter>
);
