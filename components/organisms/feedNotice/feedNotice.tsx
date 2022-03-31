import React from "react";
import * as S from "./feedNotice.styled";

const Notice=["리액션 카운트 기능이 추가될 예정입니다 🧚‍♀️"]

export const FeedNotice = () => {
  return (
    <S.Feed>
      {Notice.map((value)=>(
        <li key={value}><p>{value}</p></li>
      ))}
    </S.Feed>
  );
};
