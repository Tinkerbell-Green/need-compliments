import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import Link from "next/link";
import React, {useEffect, useMemo, useState,ReactNode} from "react";
import * as S from "./goals.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon"
import {SubHeadingSpan} from "components/atoms/subHeadingSpan";
import {useDataSaga, DataActionType, GoalData} from "stores/data";

const ICON_MAP:Record<GoalData["readPermission"], ReactNode> = {
  "everyone": <BookOpen/>,
  "me": <BookClose/>,
  "none":<BookDead/>
}

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
            <Chip label={goal.name} color={goal.color} icon={<Icon size={18} >{ICON_MAP[goal.readPermission] || <BookDead/>}</Icon>}></Chip>
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
