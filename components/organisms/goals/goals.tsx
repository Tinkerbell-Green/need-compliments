import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";
import * as S from "./goals.styled";
import {Chip} from "components/atoms/chip";
import {SubHeadingSpan} from "components/atoms/subHeadingSpan";
import {useDataSaga, DataActionType, GoalData} from "stores/data";

export const Goals = () => {
  const {fetch: getGoalsFetch, data: getGoalsData} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);
  // const [goals, setGoals] = useState<ReducedGoalData[]>([]);

  useEffect(() => {
    getGoalsFetch({});
  }, [getGoalsFetch]);

  const goals = useMemo(() => {
    const newGoals = getGoalsData || [];
    newGoals.sort((a, b) => a.createdAt - b.createdAt);
    return newGoals;
  }, [getGoalsData]);

  return (
    <>
      <S.SubHeadingContainer>
        <SubHeadingSpan>일반</SubHeadingSpan>
      </S.SubHeadingContainer>

      <S.FeedContents>
        {goals.map((goal) => (
          <S.ChipContainer key={goal.id}>
            <Chip label={goal.name} color={goal.color}></Chip>
            <Link href={{pathname: "/goals/form", query: {id: goal.id}}} passHref>
              <a>
                <SubHeadingSpan>수정하기</SubHeadingSpan>
              </a>
            </Link>
          </S.ChipContainer>
          
        ))}
      </S.FeedContents>
    </>
  );
};
