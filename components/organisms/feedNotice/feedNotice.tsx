import React from "react";
import * as S from "./feedNotice.styled";

const Notice=["나의 일상을 칭찬으로 기록해보세요! 🐋🐋🐋","리액션 카운트 기능이 추가될 예정입니다.","하루에 5개를 기록하면 달을 볼 수 있어요!"]

export const FeedNotice = () => {
  return (
    <S.Feed>
      {Notice.map((value)=>(
        <S.Li key={value}><p>{value}</p></S.Li>
      ))}
    </S.Feed>
  );
};
