import React from "react";
import * as S from "./spinner.styled";

type SpinnerProps = {
  children?:React.ReactNode,
  text?:string
  color? : string,
  size?:number,
}

export const Spinner = ({
  children,
  text,
  color = "white",
  size = 30,
}:SpinnerProps) => {
  return (
    <S.Container>
      <S.Spinner color={color} size={size}>{children}</S.Spinner>
      {text && text}
    </S.Container>
  );
};
