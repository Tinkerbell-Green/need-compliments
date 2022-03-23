import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useEffect} from "react";
import {useState} from "react";
import * as S from "../../../components/organisms/goalsForm/goalsForm.styled";
import {GoalsForm} from "components/organisms/goalsForm";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType, GoalData, GoalColor} from "stores/data";

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

  const [goal, setGoal] = useState<GoalData>();
  const [goalName, setGoalName] = useState<string>("");
  const [goalColor, setGoalColor] = useState<GoalColor>("white");
  const router = useRouter();

  const handleGoalName = (name: string) => {
    setGoalName(name);
  };

  const handleGoalColor = (color: GoalColor) => {
    setGoalColor(color);
  };

  useEffect(() => {
    getGoalsFetch({});
  }, [getGoalsFetch]);

  useEffect(() => {
    goals && setGoal(goals.filter((goal) => goal.id === router.query.id)[0]);

    if (goal) {
      setGoalName(goal?.name);
      setGoalColor(goal?.color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals, goal]);

  const onBackClick = useCallback(() => {
    if (
      (goal && (goal.name !== goalName || goal?.color !== goalColor)) ||
      (!goal && (goalName !== "" || goalColor !== "white"))
    ) {
      if (confirm("변동된 사항을 저장하시겠습니까?")) onSave();
    }
    router.push("/goals");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, goalName, goalColor]);

  const onSubmit = useCallback(() => {
    if (!goalName) alert("설정된 목표 이름이 없습니다.");
    else {
      router.push("/goals");
      onSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, goalName, goalColor]);

  const onSave = useCallback(() => {
    if (goal) {
      onUpdateGoal(goalName, goalColor);
    } else {
      onCreateGoal(goalName, goalColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, goalName, goalColor]);

  const onDelete = useCallback(() => {
    router.push("/goals");
    goal && onDeleteGoal(goal.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal]);

  const onCreateGoal = useCallback(
    (name: string, color: GoalColor) => {
      createGoalFetch({
        data: {
          name,
          color,
        },
      });
    },
    [createGoalFetch]
  );

  const onUpdateGoal = useCallback(
    (name: string, color: GoalColor) => {
      goal &&
        updateGoalFetch({
          pathSegments: [goal.id],
          data: {
            name: name,
            color,
          },
        });
    },
    [updateGoalFetch, goal]
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
        onLeftButtonClick={onBackClick}
        onRightButtonClick={onSubmit}
      >
        <GoalsForm
          goal={goal}
          onChangeGoalName={handleGoalName}
          onChangeGoalColor={handleGoalColor}
        ></GoalsForm>
      </LayoutNavigation>

      {goal && (
        <S.DeleteButtonContainer>
          <S.DeleteButton onClick={onDelete}>
            <span>삭제</span>
          </S.DeleteButton>
        </S.DeleteButtonContainer>
      )}
    </>
  );
};

export default GoalsFormPage;
