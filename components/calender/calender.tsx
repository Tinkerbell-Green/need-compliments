import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/ko";
import {useRouter} from "next/router";
import React,{useCallback, useEffect, useState} from "react"
import * as S from "./calender.styled";
import {Date} from "./date/index";
import {Header} from "./header/index";

dayjs.extend(isoWeek);// TODO: utils 로 옮기기, dayjs 클래스를 만들어서 추상화시키기
dayjs.extend(weekOfYear);
dayjs.locale("ko");

export type Direction = "next"|"previous";

const WEEK_DAYS:string[] = ["S","M","T","W","T","F","S"];
const MONTH = "month";
const NOT_THIS_MONTH = "";

export const Calender = () => {  
  const [viewDate, setViewDate] = useState(dayjs());// TODO: dayjs 객체를 state로 관리하지 말고 해당 달의 시작 날짜 Date() 혹은 string 을 prop 으로 받아서하면 어떨까=>dayjs 클래스에서 스트링타입지정하고 그 타입으로 다루기
  const [monthDays,setMonthDays] = useState([""]);
  const [today, setToday] = useState(dayjs().format("DDMMYYYY"));
  const router = useRouter();

  const handleDateClick = useCallback((date:string)=>{
    router.push(`/?date=${date}`);
  },[router]);


  const handleMonthMove = useCallback((direction:Direction) => {
    if(direction==="next"){
      setViewDate(viewDate.add(1, MONTH));
    }else if (direction==="previous"){
      setViewDate(viewDate.subtract(1, MONTH));
    }else {
      console.log(`invalid direction for month: ${direction}`);
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
        <Header title={`${viewDate.format("YYYY/MM")}`} onClick={handleMonthMove}></Header>
      </S.Header>
      <S.Main>
        <S.Days>
          {WEEK_DAYS.map((value,index) => (
            <S.Day key={index}>
              <span>{value}</span>
            </S.Day>
          ))}
        </S.Days>
        <S.Dates>
          {monthDays.map((value,index)=>{
            if(value===NOT_THIS_MONTH) return <div key={index}></div>;
            
            const curDay= value + viewDate.format("MMYYYY");
            return <Date key={index} date={curDay} isToday={curDay===today} onClick={handleDateClick}></Date>
          })}
        </S.Dates>
      </S.Main>
    </S.Container>
  )
}