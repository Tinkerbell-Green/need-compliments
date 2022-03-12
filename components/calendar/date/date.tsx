import React, {useState} from "react"
import * as S from "../calendar.styled";

type DateProps = {
  date:string,
  isToday:boolean,
  onClick: (value:string)=>void,
}

export const Date = ({date,isToday,onClick}:DateProps) => {
  const [stickers,setStickers] = useState([]);

  return (
    <S.Date onClick={()=>onClick(date)}>
      <S.Today className={isToday ? "todayHighligh" : ""}>
        <S.DateNumber>{date.slice(0,2)}</S.DateNumber>
      </S.Today>
      <S.DateEmoji>{stickers.join("")}</S.DateEmoji>
    </S.Date>
  )
}