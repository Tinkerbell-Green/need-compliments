import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {useRouter} from "next/router";
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
const DAYJS:DAY = dayjs();
const MONTH = "month";
const NOT_THIS_MONTH = "XX";

export const Calender = () => {  
  const [viewDate, setViewDate] = useState(DAYJS);
  const [monthDays,setMonthDays] = useState([""]);
  const [today, setToday] = useState(DAYJS.format("DDMMYYYY"));
  const router = useRouter();

  const handleClickDate = useCallback((date:string)=>{
    router.push(`/?date=${date}`);
  },[router]);


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
        <S.Days>
          {DATES.map((date,i) => (
            <S.Day key={i}><span>{date}</span></S.Day>
          ))}
        </S.Days>
        <S.Dates>
          {monthDays.map((v,i)=>{
            if(v===NOT_THIS_MONTH) return <div key={i}></div>;
            
            const curDay= v + viewDate.format("MMYYYY");
            return <Day key={i} date={curDay} isToday={curDay===today} handleClick={handleClickDate}></Day>
          })}
        </S.Dates>
      </S.Main>
    </S.Container>
  )
}