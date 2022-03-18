import React, {useEffect, useState} from "react";
import {ListItemRadioProps} from "../../moleculs/listItemRadio";
import {ListRadio} from "../../moleculs/listRadio";
import * as S from "./goalsForm.styled";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {themes as T} from "styles/theme";
import {useDataSaga, DataActionType, GoalData} from "stores/data";
import {useRouter} from "next/router";

type ReducedGoalData = Pick<GoalData, "id" | "name" | "color">;

export const GoalsForm = () => {
  const {fetch: getGoalsFetch, data: getGoalsData} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);

  const {fetch: updateGoalFetch} = useDataSaga<DataActionType.UPDATE_GOAL>(
    DataActionType.UPDATE_GOAL
  );

  const [goals, setGoals] = useState<ReducedGoalData[]>([]);
  const [clickedGoal, setClickedGoal] = useState<ReducedGoalData>();
  const router = useRouter();

  useEffect(() => {
    getGoalsFetch({});
  }, [getGoalsFetch]);

  useEffect(() => {
    getGoalsData &&
      setGoals(getGoalsData.map(({id, name, color}) => ({id, name, color})));
  }, [getGoalsData]);

  useEffect(() => {
    if (goals) {
      setClickedGoal(goals.filter((goal) => goal.id === router.query.id)[0]);
      setSelectedGoalColor(clickedGoal?.color);
    }
  }, [goals, router, clickedGoal]);

  const [selectedGoalColor, setSelectedGoalColor] = useState<string>("ffffff");

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
    clickedGoal &&
      updateGoalFetch({
        pathSegments: [clickedGoal.id],
        data: {
          name: "updated goal",
          color: color,
        },
      });
  };

  return (
    <>
      <SubHeadingSpan>제목</SubHeadingSpan>
      <S.GoalTitle
        color={selectedGoalColor}
        placeholder="나는 알고리즘을 정복하겠다!"
        value={clickedGoal?.name}
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
