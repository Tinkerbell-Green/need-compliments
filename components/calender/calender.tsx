import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import React,{useCallback, useState} from "react"
import * as S from "./calender.styled";
import "dayjs/locale/ko";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale("ko");

type DAY = dayjs.Dayjs;
const TODAY:DAY = dayjs();

const DATES:string[] = ["S","M","T","W","T","F","S"];

export const Calender = () => {
  const [viewDate, setViewDate] = useState(TODAY);
  const startWeek = viewDate.startOf("month").week();
  const endWeek = viewDate.endOf("month").week();

  const onNextMonth = useCallback(() => {
    setViewDate(viewDate.add(1, "month"));
  },[viewDate]);

  const onPreMonth = useCallback(() => {
    setViewDate(viewDate.subtract(1, "month"));
  },[viewDate]);

  const createCalendar = ()=>{
    let calender: React.ReactFragment[] = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(createRow(calender.length,week));
    }
    return calender;
  }

  const createRow = (key:number,week:number)=>{
    return (
      <S.Week key={key}>
        {Array(7).fill(0).map((n, i) => {
          const current = viewDate
            .startOf("week")
            .week(week)
            .add(n + i, "day");

          const isToday = TODAY.format("YYYYMMDD") === current.format("YYYYMMDD");

          return (
            <>
              <S.Day key={`${week}-${i}`}>
                <S.Today className={isToday ? "highlight" : ""}>
                  <S.DayNumber>{current.format("DD")}</S.DayNumber>
                </S.Today>
                <S.DayEmoji>😎🔑</S.DayEmoji>
              </S.Day>
            </>
          );
        })}
      </S.Week>
    );
  }
  
  return <S.Container>
    <S.Header>
      <div>
        <div>{`${viewDate.format("YYYY")}년 ${viewDate.format("MM")}월`}</div>
      </div>
      <S.Buttons>
        <button>{"<"}</button>
        <button>{">"}</button>
      </S.Buttons>
    </S.Header>
    <S.Main>
      <S.Dates>
        {DATES.map((date,i) => (
          <S.Date key={i}>
            <span>{date}</span>
          </S.Date>
        ))}
      </S.Dates>
      <S.Days>
        {createCalendar()}
      </S.Days>
    </S.Main>
    
    
  </S.Container>
}