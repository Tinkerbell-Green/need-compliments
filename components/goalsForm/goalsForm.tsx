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
      leftIcon: "open",
    },
    {
      id: 1,
      title: "일부공개",
      leftIcon: "open",
    },
    {
      id: 2,
      title: "나만보기",
      leftIcon: "open",
    },
    {
      id: 3,
      title: "숨기기",
      leftIcon: "close",
    },
  ]);

  const [running, setRunning] = useState<ListItemRadioProps[]>([
    {
      id: 0,
      title: "종료하기",
      leftIcon: null,
    },
  ]);

  return (
    <>
      <LayoutNavigation title="목표" rightButtonText="확인">
        <S.SubHeading>제목</S.SubHeading>
        <S.GoalTitle color={goalColorUserSelected}></S.GoalTitle>

        <S.SubHeading>공개설정</S.SubHeading>
        <ListRadio data={publicSettingOptions}></ListRadio>

        <S.SubHeading>진행 상황</S.SubHeading>
        <ListRadio data={running}></ListRadio>

        <S.SubHeading>색상</S.SubHeading>
        <S.ColorBox>
          <HexColorPicker
            color={goalColorUserSelected}
            onChange={setGoalColorUserSelected}
          />
        </S.ColorBox>
      </LayoutNavigation>

      <S.DeleteButtonContainer>
        <S.DeleteButton>
          <span>삭제</span>
        </S.DeleteButton>
      </S.DeleteButtonContainer>
    </>
  );
};
