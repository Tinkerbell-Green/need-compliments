import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import * as S from "./goals.styled";
import {Chip} from "components/atoms/chip";
import {SubHeadingSpan} from "components/atoms/subHeadingSpan";
import {useDataSaga, DataActionType} from "stores/data";
import {RootState} from "stores/reducers";

export const Goals = () => {
  const loggedInUserId = useSelector((state:RootState)=>state.navigation.loggedInUserId)

  const {fetch: getGoalsFetch, data: getGoalsData} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);

  useEffect(() => {
    if (!loggedInUserId) return;

    getGoalsFetch({
      input: {
        author: loggedInUserId
      }
    });
  }, [getGoalsFetch, loggedInUserId]);

  const goals = useMemo(() => {
    return (getGoalsData?.goals || []).sort((a, b) => a.createdAt - b.createdAt);
  }, [getGoalsData]);

  return (
    <>
      <S.SubHeadingContainer>
        <SubHeadingSpan>일반</SubHeadingSpan>
      </S.SubHeadingContainer>

      <S.FeedContents>
        {goals.map((goal) => (
          <S.ChipContainer key={goal._id}>
            <Chip label={goal.name} color={goal.color}></Chip>
            <Link href={{pathname: "/goals/form", query: {id: goal._id}}} passHref>
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
