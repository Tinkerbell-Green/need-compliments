import React, { useState } from "react";
import InputColor from "react-input-color";
import * as S from "./goalsForm.styled";
import { LayoutNavigation } from "components/layout-navigation";

type Color = {
  rgba: string;
};

export const GoalsForm = () => {
  const [goalColorUserSelected, setGoalColorUserSelected] = useState<Color>({
    rgba: "#000000",
  });

  return (
    <LayoutNavigation title="목표" rightButtonText="확인">
      <S.SubHeading>제목</S.SubHeading>
      <S.GoalTitle></S.GoalTitle>
      <S.SubHeading>공개설정</S.SubHeading>
      <div>
        <label htmlFor="quit">전체공개</label>
        <input type="radio" id="quit" name="" value="huey" />
      </div>
      <S.SubHeading>진행 상황</S.SubHeading>
      <div>
        <label htmlFor="quit">종료하기</label>
        <input type="radio" id="quit" name="" value="huey" />
      </div>
      <S.SubHeading>색상</S.SubHeading>

      <InputColor
        initialValue="#5e72e4"
        onChange={setGoalColorUserSelected}
        placement="bottom"
      />
      <div
        style={{
          width: 50,
          height: 50,
          marginTop: 20,
          backgroundColor: goalColorUserSelected.rgba,
        }}
      ></div>

      <S.DeleteButton>
        <span>삭제</span>
      </S.DeleteButton>
    </LayoutNavigation>
  );
};
