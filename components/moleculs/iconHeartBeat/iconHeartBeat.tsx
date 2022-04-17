import {faHandsClapping,faHeart,faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {HandThumbsUpFill,HeartFill} from "@styled-icons/bootstrap";
import {Celebration} from "@styled-icons/material-rounded";
import {ReactNode, useEffect} from "react";
import * as S from "./iconHeartBeat.styled"
import {GoalData} from "stores/data";
import {ComplimentData} from "stores/data/types"

type IconHeartProps = {
  isVisible: boolean;
  emoji:ComplimentData["type"],
  onHide: ()=>void,
}

const emojiMap: Record<ComplimentData["type"],ReactNode> = {
  "clapping-hands":<FontAwesomeIcon icon={faHandsClapping}/>,
  "party-popper":<Celebration/>,
  "red-heart":<FontAwesomeIcon icon={faHeart}/>,
  "thumbs-up":<FontAwesomeIcon icon={faThumbsUp}/>,
}

export const IconHeart = ({
  isVisible=false,
  emoji,
  onHide,
}:IconHeartProps) => {
  useEffect(()=>{
    setTimeout(onHide, 1000);
  },[onHide])
  return (
    <S.Icon isVisible={isVisible}>
      {emojiMap[emoji]}
    </S.Icon>
  );
}