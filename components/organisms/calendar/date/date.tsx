import {MoonStarsFill} from "@styled-icons/bootstrap";
import {StarOfLife} from "@styled-icons/fa-solid/StarOfLife"
import React from "react"
import * as S from "./date.styled";
import {ExpandedTaskData} from "pages/feed";

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
      onClick={()=>onClick(date)}
      aria-label={`${date.slice(0,2)}일`}>
      <S.Today className={isToday ? "todayHighligh" : ""}>
        <S.DateNumber>{date.slice(0,2)}</S.DateNumber>
      </S.Today>
      <S.EmojiList>
        {tasks.map((taskItem,index)=>(
          <S.Emoji
            key={taskItem._id}
            color={taskItem.color ? taskItem.color : "white"}>
            {index===4 ? <MoonStarsFill/> : <StarOfLife/>}
          </S.Emoji>
        ))}
      </S.EmojiList>
    </S.Date>
  )
}