import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import {ListItemRadioProps} from "../../moleculs/listItemRadio";
import {ListRadio} from "../../moleculs/listRadio";
import * as S from "./goalsForm.styled";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {useDataSaga, DataActionType, GoalData} from "stores/data";
import {themes as T} from "styles/theme";

type GoalsFormProps = {
  isOnRightButtonClick: boolean;
};
type ReducedGoalData = Pick<GoalData, "id" | "name" | "color">;

export const GoalsForm = ({isOnRightButtonClick}: GoalsFormProps) => {
  const {fetch: getGoalsFetch, data: getGoalsData} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);

  const {fetch: createGoalFetch} = useDataSaga<DataActionType.CREATE_GOAL>(
    DataActionType.CREATE_GOAL
  );
  const {fetch: updateGoalFetch} = useDataSaga<DataActionType.UPDATE_GOAL>(
    DataActionType.UPDATE_GOAL
  );

  const [goals, setGoals] = useState<ReducedGoalData[]>([]);
  const [clickedGoal, setClickedGoal] = useState<ReducedGoalData>();
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
    getGoalsFetch({});
  }, [getGoalsFetch]);

  useEffect(() => {
    getGoalsData &&
      setGoals(getGoalsData.map(({id, name, color}) => ({id, name, color})));
  }, [getGoalsData]);

  useEffect(() => {
    if (goals) {
      setClickedGoal(goals.filter((goal) => goal.id === router.query.id)[0]);
      clickedGoal && setSelectedGoalColor(clickedGoal?.color);
    }
  }, [goals, router, clickedGoal]);

  useEffect(() => {
    isOnRightButtonClick &&
      !clickedGoal &&
      createGoalFetch({
        data: {
          name: goalName,
          color: selectedGoalColor,
        },
      });
  }, [
    createGoalFetch,
    isOnRightButtonClick,
    clickedGoal,
    goalName,
    selectedGoalColor,
  ]);

  const onColorClick = (color: string) => {
    setSelectedGoalColor(color);
    clickedGoal &&
      updateGoalFetch({
        pathSegments: [clickedGoal.id],
        data: {
          color: color,
        },
      });
  };

  const onNameChange = (e) => {
    setGoalName(e.target.value);
    clickedGoal &&
      updateGoalFetch({
        pathSegments: [clickedGoal.id],
        data: {
          name: goalName,
        },
      });
  };

  return (
    <>
      <SubHeadingSpan>제목</SubHeadingSpan>
      <S.GoalTitle
        type="text"
        color={selectedGoalColor}
        placeholder="나는 리덕스를 정복하겠다!"
        defaultValue={clickedGoal?.name}
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
