import {HeartFill} from "@styled-icons/bootstrap";
import {useEffect,useState} from "react";
import * as S from "./iconHeart.styled"

type IconHeartProps = {
  isVisible: boolean;
  onHide: ()=>void,
}

export const IconHeart = ({
  isVisible=false,
  onHide
}:IconHeartProps) => {
  useEffect(()=>{
    setTimeout(onHide, 800);
  },[onHide])
  return (
    <S.Icon isVisible={isVisible}>
      <HeartFill/>
    </S.Icon>
  );
}