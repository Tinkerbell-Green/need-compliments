import {Stars,MoonStarsFill} from "@styled-icons/bootstrap";
import React from "react"
import * as S from "./date.styled";
import {ExpandedTaskData} from "pages";

type DateProps = {
  isPickedDate:boolean,
  date:string,
  tasks:ExpandedTaskData[],
  isToday:boolean,
  onClick: (value:string)=>void,
}

export const Date = ({
  isPickedDate,
  date,
  tasks=[],
  isToday,
  onClick
}:DateProps) => {
  return (
    <S.Date 
      isPickedDate={isPickedDate}
      onClick={()=>onClick(date)}>
      <S.Today className={isToday ? "todayHighligh" : ""}>
        <S.DateNumber>{date.slice(0,2)}</S.DateNumber>
      </S.Today>
      <S.EmojiList>
        {tasks.map((taskItem,index)=>(
          <S.Emoji
            key={taskItem.id}
            color={taskItem.color ? taskItem.color : "#ffffff"}>
            {index===4 ? <MoonStarsFill/> : <Stars size={18}/>}
          </S.Emoji>
        ))}
      </S.EmojiList>
    </S.Date>
  )
}