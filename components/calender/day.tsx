import React, {useState} from "react"
import * as S from "./calender.styled";

type DayProps = {
  day:string,
  isToday:boolean
}

export const Day = ({day,isToday}:DayProps) => {
  const [stickers,setStickers] = useState(["👾","🔑"]);

  const handleDayClick = () => {
    console.log(`clicked ${day}!`);
  }


  return <>
    <S.Day onClick={handleDayClick}>
      <S.Today className={isToday ? "todayCircle" : ""}>
        <S.DayNumber>{day.slice(0,2)}</S.DayNumber>
      </S.Today>
      <S.DayEmoji>{stickers.join("")}</S.DayEmoji>
    </S.Day>
  </>
}