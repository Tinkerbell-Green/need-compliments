import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useEffect} from "react";
import {useState} from "react";
import * as S from "../../../components/organisms/goalsForm/goalsForm.styled";
import {GoalsForm} from "components/organisms/goalsForm";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType, GoalData} from "stores/data";

const GoalsFormPage: NextPage = () => {
  const {fetch: getGoalsFetch, data: goals} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);
  const {fetch: createGoalFetch} = useDataSaga<DataActionType.CREATE_GOAL>(
    DataActionType.CREATE_GOAL
  );
  const {fetch: updateGoalFetch} = useDataSaga<DataActionType.UPDATE_GOAL>(
    DataActionType.UPDATE_GOAL
  );
  const {fetch: deleteGoalFetch} = useDataSaga<DataActionType.DELETE_GOAL>(
    DataActionType.DELETE_GOAL
  );

  useEffect(() => {
    getGoalsFetch({});
  }, [getGoalsFetch]);

  const router = useRouter();

  const onLeftButtonClick = useCallback(() => {
    router.push("/goals");
  }, [router]);

  const onRightButtonClick = useCallback(() => {
    router.push("/goals");
  }, [router]);

  const handleUpdateGoal = () => {
    onCreateGoal();
  };

  const onCreateGoal = useCallback(
    (goalName: string, selectedGoalColor: string) => {
      createGoalFetch({
        data: {
          name: goalName,
          color: selectedGoalColor,
        },
      });
    },
    [createGoalFetch]
  );

  const onUpdateGoal = useCallback(
    (clickedGoalId: string, color: string) => {
      updateGoalFetch({
        pathSegments: [clickedGoalId],
        data: {
          color: color,
        },
      });
    },
    [updateGoalFetch]
  );

  const onDeleteGoal = useCallback(
    (id: string) => {
      deleteGoalFetch({
        pathSegments: [id],
      });
    },
    [deleteGoalFetch]
  );

  return (
    <>
      <LayoutNavigation
        title="목표"
        rightButtonText="확인"
        onLeftButtonClick={onLeftButtonClick}
        onRightButtonClick={onRightButtonClick}
      >
        <GoalsForm
          goals={goals}
          onCreateGoal={onCreateGoal}
          onUpdateGoal={onUpdateGoal}
        ></GoalsForm>
      </LayoutNavigation>

      <S.DeleteButtonContainer>
        {/* TODO: () => onDeleteGoal() */}
        <S.DeleteButton>
          <span>삭제</span>
        </S.DeleteButton>
      </S.DeleteButtonContainer>
    </>
  );
};

export default GoalsFormPage;
