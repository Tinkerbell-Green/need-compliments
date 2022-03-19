import {useRouter} from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import * as S from "./calendar.styled";
import {Date as DateComponent} from "./date/index";
import {Header} from "./header/index";
import {ExpandedTaskData} from "pages";
import {Dayjs} from "utils/dayjs";

type CalendarProps = {
  pickedDate:string,
  onDateClick: (date:string)=>void,
  tasksByDate: Record<string, ExpandedTaskData[]>,
}

export type Direction = "next" | "previous";
const WEEK_DAYS: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const NOT_THIS_MONTH = "";

export const Calendar = ({
  pickedDate,
  onDateClick,
  tasksByDate,
}:CalendarProps) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [monthDays, setMonthDays] = useState([""]);
  const router = useRouter();

  //TODO: 쿼리에서 id받아서 date쿼리 붙이기.
  useEffect(()=>{
    // console.log({...router.query});
    router.push(`/?date=${pickedDate}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pickedDate])

  const handleMonthMove = useCallback(
    (direction: Direction) => {
      if (direction === "next") {
        setViewDate(Dayjs(viewDate).add(1, "month").toDate());
      } else if (direction === "previous") {
        setViewDate(Dayjs(viewDate).subtract(1, "month").toDate());
      } else {
        console.error(`invalid direction for month: ${direction}`);
      }
    },
    [viewDate]
  );

  useEffect(() => {
    const monthDays: string[] = [];
    const startWeek = Dayjs(viewDate).startOf("month").week();
    const endWeek =
			Dayjs(viewDate).endOf("month").week() === 1
			  ? 53
			  : Dayjs(viewDate).endOf("month").week();
    let isThisMonth = false;

    for (let week = startWeek; week <= endWeek; week++) {
      for (let i = 0; i < 7; i++) {
        const curDay =
					Dayjs(viewDate).format("MM") !== "12"
					  ? Dayjs(viewDate).startOf("week").week(week).day(i).format("DD")
					  : Dayjs(viewDate)
					    .startOf("week")
					    .week(week - 52)
					    .day(i)
					    .format("DD");

        if (curDay === "01") {
          if (isThisMonth) isThisMonth = false;
          else isThisMonth = true;
        }

        if (isThisMonth) {
          monthDays.push(curDay);
          continue;
        }
        monthDays.push(NOT_THIS_MONTH);
      }
    }
    setMonthDays(monthDays);
  }, [viewDate]);

  return (
    <S.Container>
      <S.Header>
        <Header
          title={Dayjs(viewDate).format("YYYY/MM")}
          onClick={handleMonthMove}
        ></Header>
      </S.Header>
      <S.Main>
        <S.Days>
          {WEEK_DAYS.map((value) => (
            <S.Day key={value}>
              <abbr title={value}>{value.charAt(0)}</abbr>
            </S.Day>
          ))}
        </S.Days>
        <S.Dates>
          {monthDays.map((value, index) => {
            if (value === NOT_THIS_MONTH) {
              return <div key={index}></div>;
            }

            const curDay = Dayjs(viewDate).format(`${value}/MM/YYYY`);

            return (
              <DateComponent
                key={index}
                isPickedDate={pickedDate === curDay}
                date={curDay}
                tasks={tasksByDate[curDay]}
                isToday={curDay === Dayjs(new Date()).format("DD/MM/YYYY")}
                onClick={onDateClick}
              ></DateComponent>
            );
          })}
        </S.Dates>
      </S.Main>
    </S.Container>
  );
};
