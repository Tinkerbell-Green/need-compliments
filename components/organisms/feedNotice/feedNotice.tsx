import React from "react";
import {Chip} from "components/atoms/chip";
import * as S from "components/moleculs/feedItem/feedItem.styled";

const Notice=[
  "나의 일상을 칭찬으로 기록하는 '칭찬이 필요해' 입니다.",
  "리액션 카운트 기능이 추가되었습니다. 로그인하여 사용해보세요!",
  "하루에 5개 칭찬을 기록하면 달력에서 달🌙을 볼 수 있어요."]

export const FeedNotice = () => {
  return (
    <ul>
      {Notice.map((value)=>(
        <li key={value}>
          <S.Item>
            <S.Goal><Chip label={"📍 공지"} color={"redpink"}></Chip></S.Goal>
            <S.Task>{value}</S.Task>
            <S.Li>{"04/22 11:36"}</S.Li>
          </S.Item>
        </li>
      ))}
    </ul>
  );
};
