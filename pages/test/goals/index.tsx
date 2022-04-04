import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType} from "stores/data";
import * as S from "styles/pages/test/goals.styled";

const TestGoalsPage: NextPage = () => {
  const {data: loggedInUserData} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA)
  const {fetch: getGoalsFetch, data: getGoalsData, refetch: getGoalsRefetch} = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS)

  const onSucceed = useCallback(()=>{
    getGoalsRefetch()
  },[getGoalsRefetch])

  const {fetch: createGoalFetch} = useDataSaga<DataActionType.CREATE_GOAL>(DataActionType.CREATE_GOAL, {onSucceed: ()=>getGoalsRefetch()})
  const {fetch: updateGoalFetch} = useDataSaga<DataActionType.UPDATE_GOAL>(DataActionType.UPDATE_GOAL, {onSucceed})
  const {fetch: deleteGoalFetch} = useDataSaga<DataActionType.DELETE_GOAL>(DataActionType.DELETE_GOAL, {onSucceed})

  useEffect(()=>{
    getGoalsFetch({})
  },[getGoalsFetch])

  const handleCreate = useCallback(()=>{
    createGoalFetch({
      data: {
        name: "new goal",
        color: "white",
        readPermission: "everyone"
      }
    })
  },[createGoalFetch])

  const handleUpdate = useCallback((id: string)=>{
    updateGoalFetch({
      pathSegments: [id],
      data: {
        name: "updated goal",
        color:"yellow",
        readPermission: "everyone"
      }
    })
  },[updateGoalFetch])

  const handleDelete = useCallback((id: string)=>{
    deleteGoalFetch({
      pathSegments: [id]
    })
  },[deleteGoalFetch])

  return (
    <LayoutNavigation>
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