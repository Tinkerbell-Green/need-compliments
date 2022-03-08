import type {NextPage} from "next"
import React, {useCallback, useEffect, useMemo} from "react"
import * as S from "./index.styled";
import {LayoutNavigation} from "components/layout-navigation";
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";

const TestGoalsPage: NextPage = () => {
  const {data: loggedInUserData} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA)
  const {fetch: getGoalsFetch, data: getGoalsData, refetch: getGoalsRefetch} = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS)
  const {fetch: createGoalFetch, data: createGoalData, status: createGoalStatus} = useDataSaga<DataActionType.CREATE_GOAL>(DataActionType.CREATE_GOAL)
  const {fetch: updateGoalFetch, data: updateGoalData, status: updateGoalStatus} = useDataSaga<DataActionType.UPDATE_GOAL>(DataActionType.UPDATE_GOAL)
  const {fetch: deleteGoalFetch, status: deleteGoalStatus} = useDataSaga<DataActionType.DELETE_GOAL>(DataActionType.DELETE_GOAL)

  useEffect(()=>{
    console.log("loggedInUserData: ", loggedInUserData); // TODO: remove 
  },[loggedInUserData])

  useEffect(()=>{
    getGoalsFetch({})
  },[getGoalsFetch])

  const handleCreate = useCallback(()=>{
    createGoalFetch({
      data: {
        name: "new goal",
        color: "blue1"
      }
    })
  },[createGoalFetch])

  const handleUpdate = useCallback((id: string)=>{
    updateGoalFetch({
      pathSegments: [id],
      data: {
        name: "updated goal",
      }
    })
  },[updateGoalFetch])

  const handleDelete = useCallback((id: string)=>{
    deleteGoalFetch({
      pathSegments: [id]
    })
  },[deleteGoalFetch])

  const handleLeftButtonClick = useCallback(()=>{
  },[])

  useEffect(()=>{
    if (createGoalStatus === DataSagaStatus.SUCCEEDED){
      getGoalsRefetch()
    }
  },[getGoalsRefetch, createGoalStatus])

  useEffect(()=>{
    if (updateGoalStatus === DataSagaStatus.SUCCEEDED){
      getGoalsRefetch()
    }
  },[getGoalsRefetch, updateGoalStatus])

  useEffect(()=>{
    if (deleteGoalStatus === DataSagaStatus.SUCCEEDED){
      getGoalsRefetch()
    }
  },[getGoalsRefetch, deleteGoalStatus])

  return (
    <LayoutNavigation
      rightButtonText={"?"}
      title="test goals"
      onLeftButtonClick={handleLeftButtonClick}
    >
      <S.Button onClick={handleCreate}>CREATE</S.Button>

      <S.ListGoal>
        {(getGoalsData || []).map(item => (
          <S.ListItemGoal key={item.id}>
            <S.IdGoal>{item.id}</S.IdGoal>
            <S.NameGoal>{item.name}</S.NameGoal>
            <button onClick={()=>handleDelete(item.id)}>삭제</button>
            <button onClick={()=>handleUpdate(item.id)}>업데이트</button>
          </S.ListItemGoal>
        ))}
      </S.ListGoal>
    </LayoutNavigation>   
  )
}

export default TestGoalsPage