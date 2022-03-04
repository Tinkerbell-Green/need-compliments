import React from "react";
import { LayoutNavigation } from "components/layout-navigation";
import * as S from "./goalsForm.styled";

export const GoalsForm = () => (
  <LayoutNavigation title="목표" rightButtonText="확인">
    <S.SubHeading>제목</S.SubHeading>
    <S.GoalTitle></S.GoalTitle>
    <S.SubHeading>공개설정</S.SubHeading>
    <S.SubHeading>진행 상황</S.SubHeading>
    <S.SubHeading>색상</S.SubHeading>
    <S.DeleteButton>
      <span>삭제</span>
    </S.DeleteButton>
  </LayoutNavigation>
);
