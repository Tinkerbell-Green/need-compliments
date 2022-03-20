import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import {ListItemRadioProps} from "../../moleculs/listItemRadio";
import {ListRadio} from "../../moleculs/listRadio";
import * as S from "./goalsForm.styled";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {GoalData} from "stores/data";
import {themes as T} from "styles/theme";

type GoalsFormProps = {
  goal?: GoalData;
  onChangeGoalName: (name: string) => void;
  onChangeGoalColor: (color: string) => void;
};

export const GoalsForm = ({
  goal,
  onChangeGoalName,
  onChangeGoalColor,
}: GoalsFormProps) => {
  const [clickedGoalColor, setClickedGoalColor] = useState<string>("white");
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

  useEffect(() => {
    goal && setClickedGoalColor(goal?.color);
  }, [goal]);

  const onColorClick = (color: string) => {
    setClickedGoalColor(color);
    onChangeGoalColor(color);
  };

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeGoalName(e.target.value);
  };
  console.log(clickedGoalColor);

  return (
    <>
      <SubHeadingSpan>제목</SubHeadingSpan>
      <S.GoalTitle
        type="text"
        color={clickedGoalColor}
        placeholder="나는 리덕스를 정복하겠다!"
        defaultValue={goal?.name}
        onChange={onNameChange}
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
