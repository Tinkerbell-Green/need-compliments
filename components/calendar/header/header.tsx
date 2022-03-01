import React from "react"
import {Direction} from "../calendar";
import * as S from "../calendar.styled";

type HeaderProps = {
  title:string,
  onClick: (value:Direction)=>void,
}

export const Header= ({title,onClick}:HeaderProps) =>{
  return <>
    <S.Title>{title}</S.Title>
    <S.Buttons>
      <S.Button onClick={()=>onClick("previous")}>{"<"}</S.Button>
      <S.Button onClick={()=>onClick("next")}>{">"}</S.Button>
    </S.Buttons>
  </>
}