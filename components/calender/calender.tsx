import {useRouter} from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import Dayjs from "../../utils/dayjs";
import * as S from "./calender.styled";
import {Date as DateComponent} from "./date/index";
import {Header} from "./header/index";
const dayjs = new Dayjs();

export type Direction = "next" | "previous";

const WEEK_DAYS: string[] = ["S", "M", "T", "W", "T", "F", "S"];
const NOT_THIS_MONTH = "";

export const Calender = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [monthDays, setMonthDays] = useState([""]);
  const router = useRouter();

  const handleDateClick = useCallback(
    (date: string) => {
      router.push(`/?date=${date}`);
    },
    [router]
  );

  const handleMonthMove = useCallback(
    (direction: Direction) => {
      if (direction === "next") {
        setViewDate(dayjs.moveToNextMonth(viewDate));
        return;
      }
      if (direction === "previous") {
        setViewDate(dayjs.moveToPreviousMonth(viewDate));
        return;
      }
      console.log(`invalid direction for month: ${direction}`);
    },
    [viewDate]
  );

  useEffect(() => {
    const monthDays: string[] = [];
    const startWeek = dayjs.getStartWeek(viewDate);
    const endWeek =
			dayjs.getEndWeek(viewDate) === 1 ? 53 : dayjs.getEndWeek(viewDate);
    let isThisMonth = false;

    for (let week = startWeek; week <= endWeek; week++) {
      for (let i = 0; i < 7; i++) {
        const curDay = dayjs.format(dayjs.getDate(viewDate, week, i), "DD");

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
          title={dayjs.format(viewDate, "YYYY/MM")}
          onClick={handleMonthMove}
        ></Header>
      </S.Header>
      <S.Main>
        <S.Days>
          {WEEK_DAYS.map((value, index) => (
            <S.Day key={index}>
              <span>{value}</span>
            </S.Day>
          ))}
        </S.Days>
        <S.Dates>
          {monthDays.map((value, index) => {
            if (value === NOT_THIS_MONTH) {
              return <div key={index}></div>;
            }

            const curDay = dayjs.format(viewDate, `${value}MMYYYY`);

            return (
              <DateComponent
                key={index}
                date={curDay}
                isToday={curDay === dayjs.format(new Date(), "DDMMYYYY")}
                onClick={handleDateClick}
              ></DateComponent>
            );
          })}
        </S.Dates>
      </S.Main>
    </S.Container>
  );
};
