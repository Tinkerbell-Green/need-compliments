import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import React,{useCallback, useEffect, useState} from "react"
import * as S from "./calender.styled";
import "dayjs/locale/ko";
import {Day} from "./day";

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale("ko");

type DAY = dayjs.Dayjs;
type MOVE = "+"|"-";

const DATES:string[] = ["S","M","T","W","T","F","S"];
const TODAY:DAY = dayjs();
const MONTH = "month";
const NOT_THIS_MONTH = "XX";

export const Calender = () => {  
  const [viewDate, setViewDate] = useState(TODAY);
  const [monthDays,setMonthDays] = useState([""]);

  const onMovetMonth = useCallback((move:MOVE) => {
    switch(move){
    case "+":
      setViewDate(viewDate.add(1, MONTH));
      break;
    case "-":
      setViewDate(viewDate.subtract(1, MONTH));
      break;
    default:
      console.log(`invalid move for month: ${move}`);
    }
  },[viewDate]);

  useEffect(() => {
    const monthDays:string[]=[];
    const startWeek = viewDate.startOf(MONTH).week();
    const endWeek = viewDate.endOf(MONTH).week();
    let isThisMonth=false;

    for (let week = startWeek; week <= endWeek; week++) {
      for(let i=0; i<7; i++){
        const curDay = viewDate.startOf("week").week(week).add(i, "day").format("DD");
        
        if(curDay==="01"){
          if(isThisMonth) isThisMonth=false;
          else isThisMonth=true;
        }
        
        if(isThisMonth) {
          monthDays.push(curDay);
          continue;
        }
        monthDays.push(NOT_THIS_MONTH);
      }
    }
    setMonthDays(monthDays);
  },[viewDate]);

  return (
    <S.Container>
      <S.Header>
        <div>
          <div>{`${viewDate.format("YYYY/MM")}`}</div>
        </div>
        <S.Buttons>
          <button onClick={()=>onMovetMonth("-")}>{"<"}</button>
          <button onClick={()=>onMovetMonth("+")}>{">"}</button>
        </S.Buttons>
      </S.Header>
      <S.Main>
        <S.Dates>
          {DATES.map((date,i) => (
            <S.Date key={i}><span>{date}</span></S.Date>
          ))}
        </S.Dates>
        <S.Days>
          {monthDays.map((v,i)=>{
            if(v===NOT_THIS_MONTH) return <div></div>;
            
            const curDay= v + viewDate.format("MMYYYY");
            return <Day key={i} day={curDay} isToday={curDay===TODAY.format("DDMMYYYY")}></Day>
          })}
        </S.Days>
      </S.Main>
    </S.Container>
  )
}