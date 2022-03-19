import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import {ListItemRadioProps} from "../../moleculs/listItemRadio";
import {ListRadio} from "../../moleculs/listRadio";
import * as S from "./goalsForm.styled";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {GoalData} from "stores/data";
import {themes as T} from "styles/theme";

type GoalsFormProps = {
  goals?: GoalData[];
  onCreateGoal: (goalName: string, selectedGoalColor: string) => void;
  onUpdateGoal: (clickedGoalId: string, color: string) => void;
};

export const GoalsForm = ({
  goals,
  onCreateGoal,
  onUpdateGoal,
}: GoalsFormProps) => {
  const [clickedGoal, setClickedGoal] = useState<GoalData>();
  const [goalName, setGoalName] = useState<string>("나는 리덕스를 정복하겠다!");
  const [selectedGoalColor, setSelectedGoalColor] = useState<string>("white");
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
  const router = useRouter();

  useEffect(() => {
    setClickedGoal(goals.filter((goal) => goal.id === router.query.id)[0]);
    clickedGoal && setSelectedGoalColor(clickedGoal?.color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals, clickedGoal]);

  useEffect(() => {
    if (isSubmitButtonClick && !clickedGoal) {
      onCreateGoal(goalName, selectedGoalColor);
    }
  }, []);

  useEffect(() => {
    if (isDeleteButtonClick && clickedGoal && router.query.id) {
      onDeleteGoal();
      router.push("/goals");
    }
  }, []);

  const onColorClick = (color: string) => {
    setSelectedGoalColor(color);
    clickedGoal && onUpdateGoal();
  };

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setGoalName(e.target.value);
    clickedGoal && onUpdateGoal();
  };

  return (
    <>
      <SubHeadingSpan>제목</SubHeadingSpan>
      <S.GoalTitle
        type="text"
        color={selectedGoalColor}
        placeholder="나는 리덕스를 정복하겠다!"
        defaultValue={clickedGoal?.name}
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
