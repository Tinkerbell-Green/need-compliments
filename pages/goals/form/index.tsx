import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useEffect} from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {GoalData, GoalColor} from "apis"
import {Seo} from "components/atoms/seo";
import {GoalsForm} from "components/organisms/goalsForm";
import * as S from "components/organisms/goalsForm/goalsForm.styled";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType} from "stores/data";
import {RootState} from "stores/reducers";

const GoalsFormPage: NextPage = () => {
  const loggedInUserId = useSelector((state:RootState)=>state.navigation.loggedInUserId)
  const {fetch: getGoalsFetch, data: goals} =
    useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS, []);
  const {fetch: createGoalFetch} = useDataSaga<DataActionType.CREATE_GOAL>(
    DataActionType.CREATE_GOAL,
    []
  );
  const {fetch: updateGoalFetch} = useDataSaga<DataActionType.UPDATE_GOAL>(
    DataActionType.UPDATE_GOAL,
    []
  );
  const {fetch: deleteGoalFetch} = useDataSaga<DataActionType.DELETE_GOAL>(
    DataActionType.DELETE_GOAL,
    []
  );

  const [goal, setGoal] = useState<GoalData>();
  const [goalName, setGoalName] = useState<string>("");
  const [goalColor, setGoalColor] = useState<GoalColor>("white");
  const [goalPrivacy, setGoalPrivacy] = useState<GoalData["readPermission"]>("everyone")
  const router = useRouter();
  
  const handleGoalName = (name: string) => {
    setGoalName(name);
  };

  const handleGoalColor = (color: GoalColor) => {
    setGoalColor(color);
  };

  const handleGoalPrivacy = (readPermission: GoalData["readPermission"]) => {
    setGoalPrivacy(readPermission);
  };

  useEffect(() => {
    if (!loggedInUserId) return;

    getGoalsFetch({input:{
      author: loggedInUserId
    }});
  }, [getGoalsFetch, loggedInUserId]);


  const onCreateGoal = useCallback(
    (name: string, color: GoalColor, readPermission: GoalData["readPermission"]) => {
      if (!loggedInUserId) return;
      
      createGoalFetch({
        input: {
          author: loggedInUserId,
          name,
          color,
          readPermission
        },
      });
    },
    [createGoalFetch, loggedInUserId]
  );

  const onUpdateGoal = useCallback(
    (name: string, color: GoalColor, readPermission: GoalData["readPermission"]) => {
      goal &&
        updateGoalFetch({
          id: goal._id,
          input: {
            name: name,
            color,
            readPermission
          },
        });
    },
    [updateGoalFetch, goal]
  );

  const onDeleteGoal = useCallback(
    (id: string) => {
      deleteGoalFetch({
        id,
      });
    },
    [deleteGoalFetch]
  );

  const onSave = useCallback(() => {
    if (goal) {
      onUpdateGoal(goalName, goalColor, goalPrivacy);
    } else {
      onCreateGoal(goalName, goalColor, goalPrivacy);
    }
  }, [goal, onUpdateGoal, goalName, goalColor, goalPrivacy, onCreateGoal]);

  useEffect(() => {
    goals && setGoal((goals.goals || []).filter((goal) => goal._id === router.query.id)[0]);

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
  }, [goal, goalName, goalColor, router, onSave]);

  const onSubmit = useCallback(() => {
    if (!goalName) alert("설정된 목표 이름이 없습니다.");
    else {
      router.push("/goals");
      onSave();
    }
  }, [goalName, router, onSave]);

  const onDelete = useCallback(() => {
    router.push("/goals");
    goal && onDeleteGoal(goal._id);
  }, [goal, onDeleteGoal, router]);

  return (
    <>
      <LayoutNavigation>
        <Seo title={`(작성 중) ${goalName}`}></Seo>
        <GoalsForm
          goal={goal}
          onChangeGoalName={handleGoalName}
          onChangeGoalColor={handleGoalColor}
          goalPrivacy={goalPrivacy}
          onChangeGoalPrivacy={handleGoalPrivacy}
        ></GoalsForm>
      </LayoutNavigation>

      <S.ButtonContainer>
        {goal && (
          <S.DeleteButton onClick={onDelete}>
            <span>삭제</span>
          </S.DeleteButton>
        )}
        <S.Button onClick={onSubmit}>
          <span>확인</span>
        </S.Button>
      </S.ButtonContainer>
    </>
  );
};

export default GoalsFormPage;
