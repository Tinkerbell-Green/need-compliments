import React, { useState } from "react";
import * as S from "./goalsForm.styled";
import { ListItemRadioProps } from "./listItemRadio";
import { ListRadio } from "./listRadio";
import { LayoutNavigation } from "components/layout-navigation";

export const GoalsForm = () => {
  const [goalColorUserSelected, setGoalColorUserSelected] =
    useState<string>("#ffffff");

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

  const goalColorList = [
    "#808080",
    "#292F56",
    "#222F92",
    "#3456A4",
    "#3274F6",
    "#4FA4E5",
    "#AD69ED",
    "#735DAF",
    "#6911A4",
    "#7A7EEE",
    "#4518F4",
    "#5C38F5",
    "#4E9198",
    "#5E9E68",
    "#446E74",
    "#99C355",
    "#60D155",
    "#828A53",
    "#ED9F8D",
    "#ED76BF",
    "#EA449B",
    "#DC7B82",
    "#E25B62",
    "#BB3D4D",
    "#F3D055",
    "#F19739",
    "#DB723D",
    "#D39E3E",
    "#987A5B",
    "#6E472A",
  ];

  return (
    <>
      <LayoutNavigation title="목표" rightButtonText="확인">
        <S.SubHeading>제목</S.SubHeading>
        <S.GoalTitle
          color={goalColorUserSelected}
          placeholder="나는 알고리즘을 정복하겠다!"
        ></S.GoalTitle>

        <S.SubHeading>공개설정</S.SubHeading>
        <ListRadio data={publicSettingOptions}></ListRadio>

        <S.SubHeading>진행 상황</S.SubHeading>
        <ListRadio data={running}></ListRadio>

        <S.SubHeading>색상</S.SubHeading>
        <S.ColorPalette>
          {goalColorList.map((color) => (
            <S.OneColcor key={color} color={color}></S.OneColcor>
          ))}
        </S.ColorPalette>
      </LayoutNavigation>

      <S.DeleteButtonContainer>
        <S.DeleteButton>
          <span>삭제</span>
        </S.DeleteButton>
      </S.DeleteButtonContainer>
    </>
  );
};
