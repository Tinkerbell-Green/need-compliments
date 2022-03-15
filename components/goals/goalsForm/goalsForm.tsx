import React, {useState} from "react";
import * as S from "./goalsForm.styled";
import {ListItemRadioProps} from "./listItemRadio";
import {ListRadio} from "./listRadio";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {themes as T} from "styles/theme";

export const GoalsForm = () => {
  const [selectedGoalColor, setSelectedGoalColor] = useState<string>("#ffffff");

  const [publicSettingOptions, setPublicSettingOptions] = useState<
    ListItemRadioProps[]
  >([
    {
      id: 0,
      title: "전체공개",
      publicBookIcon: "public",
    },
    {
      id: 1,
      title: "일부공개",
      publicBookIcon: "protected",
    },
    {
      id: 2,
      title: "나만보기",
      publicBookIcon: "private",
    },
    {
      id: 3,
      title: "숨기기",
      publicBookIcon: "private",
    },
  ]);

  const [runningOptions, setRunningOptions] = useState<ListItemRadioProps[]>([
    {
      id: 0,
      title: "종료하기",
      publicBookIcon: null,
    },
  ]);

  const onColorClick = (color: string) => {
    setSelectedGoalColor(color);
  };

  return (
    <>
      <SubHeadingSpan>제목</SubHeadingSpan>
      <S.GoalTitle
        color={selectedGoalColor}
        placeholder="나는 알고리즘을 정복하겠다!"
      ></S.GoalTitle>

      <SubHeadingSpan>공개설정</SubHeadingSpan>
      <ListRadio data={publicSettingOptions}></ListRadio>

      <SubHeadingSpan>진행 상황</SubHeadingSpan>
      <ListRadio data={runningOptions}></ListRadio>

      <SubHeadingSpan>색상</SubHeadingSpan>
      <S.ColorPalette>
        {Object.keys(T.dark.colors.goals).map((color: string) => (
          <S.OneColcor
            key={color}
            color={color}
            onClick={() => onColorClick(color)}
          ></S.OneColcor>
        ))}
      </S.ColorPalette>
    </>
  );
};
