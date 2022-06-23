import React, {useCallback} from "react"
import * as S from "./reactionButton.styled";
import {ComplimentData} from "api"

type ReactionButtonProps = {
  type: ComplimentData["type"],
  clicked: boolean,
  onClickEmoji: (emoji: ComplimentData["type"]) => void;
}

const COMPLIMENTS_ICON_MAP:Record<ComplimentData["type"],string>={
  "thumbs-up": "👍🏻",
  "clapping-hands" : "👏🏻",
  "party-popper": "🎉",
  "red-heart": "❤️"
}

export const ReactionButton = ({type,clicked,onClickEmoji}:ReactionButtonProps) => {

  const handleClickedEmoji=useCallback(()=>{
    onClickEmoji(type);
  },[onClickEmoji,type])

  return (
    <S.Reaction
      onClick={handleClickedEmoji} 
      clicked={clicked}>
      {COMPLIMENTS_ICON_MAP[type]}
    </S.Reaction>
  )
}
