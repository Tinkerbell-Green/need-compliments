import {faHandsClapping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {HandThumbsUpFill,HeartFill} from "@styled-icons/bootstrap";
import {Celebration} from "@styled-icons/material-rounded";
import {ReactNode, useEffect} from "react";
import * as S from "./iconHeartBeat.styled"
import {ComplimentData} from "stores/data/types"

type IconHeartProps = {
  isVisible: boolean;
  emoji:ComplimentData["type"],
  onHide: ()=>void,
}

const emojiMap: Record<ComplimentData["type"],ReactNode> = {
  "clapping-hands":<FontAwesomeIcon icon={faHandsClapping}/>,
  "party-popper":<Celebration/>,
  "red-heart":<HeartFill/>,
  "thumbs-up":<HandThumbsUpFill/>,
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
    <S.Icon isVisible={isVisible} color={"#ff6f6f"}>
      {emojiMap[emoji]}
    </S.Icon>
  );
}