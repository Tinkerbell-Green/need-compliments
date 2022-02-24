import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import React,{useCallback, useEffect, useState} from "react"
import * as S from "./calender.styled";
import "dayjs/locale/ko";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale("ko");

type DAY = dayjs.Dayjs;

const DATES:string[] = ["S","M","T","W","T","F","S"];

export const Calender = () => {
  const TODAY:DAY = dayjs();
  const [viewDate, setViewDate] = useState(TODAY);
  const [monthDays,setMonthDays] = useState([""]);
  const [today,setToday] = useState(TODAY.format("DD"));

  const startWeek = viewDate.startOf("month").week();
  const endWeek = viewDate.endOf("month").week();

  const onNextMonth = useCallback(() => {
    setViewDate(viewDate.add(1, "month"));
  },[viewDate]);

  const onPreMonth = useCallback(() => {
    setViewDate(viewDate.subtract(1, "month"));
  },[viewDate]);

  useEffect(() => {
    const monthDays:string[]=[];

    for (let week = startWeek; week <= endWeek; week++) {
      for(let i=0; i<7; i++){
        monthDays.push(viewDate.startOf("week").week(week).add(i, "day").format("DD"));
      }
      setMonthDays(monthDays);
    }
  },[viewDate,startWeek,endWeek]);

  return (<S.Container>
    <S.Header>
      <div>
        <div>{`${viewDate.format("YYYY")}년 ${viewDate.format("MM")}월`}</div>
      </div>
      <S.Buttons>
        <button onClick={onPreMonth}>{"<"}</button>
        <button onClick={onNextMonth}>{">"}</button>
      </S.Buttons>
    </S.Header>
    <S.Main>
      <S.Dates>
        {DATES.map((date,i) => (
          <S.Date key={i}><span>{date}</span></S.Date>
        ))}
      </S.Dates>
      <S.Days>
        {monthDays.map((v,i)=>(
          <S.Day key={i}>
            <S.Today className={v===today ? "highlight" : ""}>
              <S.DayNumber>{i}</S.DayNumber>
            </S.Today>
            <S.DayEmoji>😎🔑</S.DayEmoji>
          </S.Day>
        ))}
      </S.Days>
    </S.Main>
  </S.Container>)
}