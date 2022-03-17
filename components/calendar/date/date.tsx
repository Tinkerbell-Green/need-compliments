import {Stars} from "@styled-icons/bootstrap"
import React, {useState} from "react"
import * as S from "../calendar.styled";
import {ExpandedTaskData} from "pages";

type DateProps = {
  date:string,
  tasks:ExpandedTaskData[],
  isToday:boolean,
  onClick: (value:string)=>void,
}

export const Date = ({
  date,
  tasks=[],
  isToday,
  onClick
}:DateProps) => {

  return (
    <S.Date onClick={()=>onClick(date)}>
      <S.Today className={isToday ? "todayHighligh" : ""}>
        <S.DateNumber>{date.slice(0,2)}</S.DateNumber>
      </S.Today>
      <S.EmojiList>
        {tasks.map((taskItem)=>(
          <S.Emoji 
            key={taskItem.id}
            color={taskItem.color ? taskItem.color : "#ffffff"}><Stars></Stars></S.Emoji>
        ))}
      </S.EmojiList>
    </S.Date>
  )
}