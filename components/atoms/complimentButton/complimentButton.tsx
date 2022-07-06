import React, {useCallback} from "react"
import * as S from "./complimentButton.styled";
import {ComplimentData} from "api"

type ComplimentButtonProps = {
  type: ComplimentData["type"],
  clicked: boolean,
  onClick: (type: ComplimentData["type"]) => void;
}

const COMPLIMENTS_ICON_MAP:Record<ComplimentData["type"],string>={
  "thumbs-up": "👍🏻",
  "clapping-hands" : "👏🏻",
  "party-popper": "🎉",
  "red-heart": "❤️"
}

export const ComplimentButton = ({type,clicked,onClick}:ComplimentButtonProps) => {

  const handleClickedEmoji=useCallback(()=>{
    onClick(type);
  },[onClick,type])

  return (
    <S.Compliment
      onClick={handleClickedEmoji} 
      clicked={clicked}>
      {COMPLIMENTS_ICON_MAP[type]}
    </S.Compliment>
  )
}
