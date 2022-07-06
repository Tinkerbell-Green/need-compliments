import {HeartFill} from "@styled-icons/bootstrap";
import {useEffect} from "react";
import * as S from "./iconHeartBeat.styled"

type IconHeartProps = {
  isVisible: boolean;
  onHide: ()=>void,
}

export const IconHeart = ({
  isVisible=false,
  onHide,
}:IconHeartProps) => {
  useEffect(()=>{
    setTimeout(onHide, 1000);
  },[onHide])
  return (
    <S.Icon isVisible={isVisible}>
      <HeartFill></HeartFill>
    </S.Icon>
  );
}