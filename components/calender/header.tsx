import React from "react"
import {MOVE} from "./calender";
import * as S from "./calender.styled";

type HeaderProps = {
  title:string,
  handleClick: (x:MOVE)=>void,
}

export const Header= ({title,handleClick}:HeaderProps) =>{
  return <>
    <S.Title>{title}</S.Title>
    <S.Buttons>
      <S.Button onClick={()=>handleClick("-")}>{"<"}</S.Button>
      <S.Button onClick={()=>handleClick("+")}>{">"}</S.Button>
    </S.Buttons>
  </>
}