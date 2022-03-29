import {HeartFill} from "@styled-icons/bootstrap";
import {useEffect,useState} from "react";
import * as S from "./iconHeartBeat.styled"

type IconHeartProps = {
  isVisible: boolean;
  emoji:string,
  onHide: ()=>void,
}

export const IconHeart = ({
  isVisible=false,
  emoji,
  onHide
}:IconHeartProps) => {
  useEffect(()=>{
    setTimeout(onHide, 800);
  },[onHide,isVisible])
  return (
    <S.Icon isVisible={isVisible}>
      {emoji}
    </S.Icon>
  );
}