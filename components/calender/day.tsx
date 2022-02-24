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
    <S.Date onClick={handleDayClick}>
      <S.Today className={isToday ? "todayCircle" : ""}>
        <S.DateNumber>{day.slice(0,2)}</S.DateNumber>
      </S.Today>
      <S.DateEmoji>{stickers.join("")}</S.DateEmoji>
    </S.Date>
  </>
}