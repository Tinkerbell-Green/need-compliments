import {useRouter} from "next/router";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import * as S from "./goals.styled";
import {Chip} from "components/atoms/chip";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {useDataSaga, DataActionType, GoalData} from "stores/data";

export const Goals = () => {
  const {fetch: getGoalsFetch, data: getGoalsData} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);
  // const [goals, setGoals] = useState<ReducedGoalData[]>([]);
  const router = useRouter();

  useEffect(() => {
    getGoalsFetch({});
  }, [getGoalsFetch]);

  const goals = useMemo(() => {
    const newGoals = getGoalsData || [];
    newGoals.sort((a, b) => a.createdAt - b.createdAt);
    return newGoals;
  }, [getGoalsData]);

  // const
  // useEffect(() => {
  //   getGoalsData &&
  //     setGoals(getGoalsData.map(({id, name, color}) => ({id, name, color})));
  // }, [getGoalsData]);

  const onChipClick = useCallback(
    (clickedGoalId: string) => {
      router.push(`/goals/form/?id=${clickedGoalId}`);
    },
    [router]
  );

  return (
    <>
      <S.SubHeadingContainer>
        <SubHeadingSpan>일반</SubHeadingSpan>
      </S.SubHeadingContainer>

      <S.FeedContents>
        {goals.map((goal) => (
          <S.ChipContainer key={goal.id} onClick={() => onChipClick(goal.id)}>
            <Chip label={goal.name} color={goal.color}></Chip>
          </S.ChipContainer>
        ))}
      </S.FeedContents>
    </>
  );
};
