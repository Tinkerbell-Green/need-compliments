import React, {useState} from "react";
import * as S from "./goalsForm.styled";
import {ListItemRadioProps} from "./listItemRadio";
import {ListRadio} from "./listRadio";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";

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
        {goalColorList.map((color) => (
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
