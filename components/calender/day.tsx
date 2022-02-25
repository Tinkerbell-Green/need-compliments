import React, {useCallback, useEffect, useState} from "react"
import * as S from "./calender.styled";

type DayProps = {
  date:string,
  isToday:boolean
  handleClick: (x:string)=>void,
}

export const Day = ({date,isToday,handleClick}:DayProps) => {
  const [stickers,setStickers] = useState(["👾","🔑"]);

  return <>
    <S.Date onClick={()=>handleClick(date)}>
      <S.Today className={isToday ? "todayCircle" : ""}>
        <S.DateNumber>{date.slice(0,2)}</S.DateNumber>
      </S.Today>
      <S.DateEmoji>{stickers.join("")}</S.DateEmoji>
    </S.Date>
  </>
}