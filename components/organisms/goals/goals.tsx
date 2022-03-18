import React, {useCallback, useEffect, useState} from "react";
import * as S from "./goals.styled";
import {Chip} from "components/atoms/chip";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {useDataSaga, DataActionType, GoalData} from "stores/data";
import {useRouter} from "next/router";

type ReducedGoalData = Pick<GoalData, "id" | "name" | "color">;

export const Goals = () => {
  const {fetch: getGoalsFetch, data: getGoalsData} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);
  const [goals, setGoals] = useState<ReducedGoalData[]>([]);
  const router = useRouter();

  useEffect(() => {
    getGoalsFetch({});
  }, [getGoalsFetch]);

  useEffect(() => {
    getGoalsData &&
      setGoals(getGoalsData.map(({id, name, color}) => ({id, name, color})));
  }, [getGoalsData]);

  const onChipClick = useCallback(() => {
    router.push(`/goals/form`);
  }, [router]);

  return (
    <>
      <S.SubHeadingContainer>
        <SubHeadingSpan>일반</SubHeadingSpan>
      </S.SubHeadingContainer>

      <S.FeedContents>
        {goals.map((value) => (
          <S.ChipContainer key={value.id} onClick={onChipClick}>
            <Chip id={value.id} label={value.name} color={value.color}></Chip>
          </S.ChipContainer>
        ))}
      </S.FeedContents>
    </>
  );
};
