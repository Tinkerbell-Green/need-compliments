import React from "react";
import * as S from "./subHeadingButton.styled";

type SubHeadingButtonPros = {
  children: React.ReactNode;
  status?: "error" | "default";
};

export const SubHeadingButton = ({
  children,
  status = "default",
}: SubHeadingButtonPros) => (
  <S.SubHeadingButton status={status}>{children}</S.SubHeadingButton>
);
