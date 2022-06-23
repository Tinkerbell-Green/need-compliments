import React from "react"
import * as S from "./reactionButton.styled";

export const ReactionButton = () => {
  return (
    <S.Reaction 
      onClick={()=>handleClickedEmoji("thumbs-up")} 
      complimented={complimented?.type==="thumbs-up"}>
      {"👍🏻"}
    </S.Reaction>
  )
}
