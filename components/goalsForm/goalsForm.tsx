import React, {useState} from "react";
import {HexColorPicker} from "react-colorful";
import * as S from "./goalsForm.styled";
import {ListItemRadioProps} from "./listItemRadio";
import {ListRadio} from "./listRadio";
import {LayoutNavigation} from "components/layout-navigation";

export const GoalsForm = () => {
  const [goalColorUserSelected, setGoalColorUserSelected] =
    useState<string>("#000000");

  const [publicSettingOptions, setPublicSettingOptions] = useState<
    ListItemRadioProps[]
  >([
    {
      id: 0,
      title: "전체공개",
      leftIcon: "",
    },
    {
      id: 1,
      title: "일부공개",
      leftIcon: "",
    },
  ]);

  return (
    <LayoutNavigation title="목표" rightButtonText="확인">
      <S.SubHeading>제목</S.SubHeading>
      <S.GoalTitle color={goalColorUserSelected}></S.GoalTitle>
      <S.SubHeading>공개설정</S.SubHeading>
      <ListRadio data={publicSettingOptions}></ListRadio>

      <S.SubHeading>진행 상황</S.SubHeading>
      <div>
        <label htmlFor="quit">종료하기</label>
        <input type="radio" id="quit" name="" value="huey" />
      </div>
      <S.SubHeading>색상</S.SubHeading>

      <S.ColorBox>
        <HexColorPicker
          color={goalColorUserSelected}
          onChange={setGoalColorUserSelected}
        />
      </S.ColorBox>

      <S.DeleteButton>
        <span>삭제</span>
      </S.DeleteButton>
    </LayoutNavigation>
  );
};
