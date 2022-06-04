import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {useSelector} from "react-redux";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType} from "stores/data";
import {RootState} from "stores/reducers";
import * as S from "styles/pages/test/goals.styled";

const TestGoalsPage: NextPage = () => {
  const loggedInUserId = useSelector((state:RootState)=>state.navigation.loggedInUserId)
  const {fetch: getGoalsFetch, data: getGoalsData, refetch: getGoalsRefetch} = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS)

  const onSucceed = useCallback(()=>{
    getGoalsRefetch()
  },[getGoalsRefetch])

  const {fetch: createGoalFetch} = useDataSaga<DataActionType.CREATE_GOAL>(DataActionType.CREATE_GOAL, {onSucceed: ()=>getGoalsRefetch()})
  const {fetch: updateGoalFetch} = useDataSaga<DataActionType.UPDATE_GOAL>(DataActionType.UPDATE_GOAL, {onSucceed})
  const {fetch: deleteGoalFetch} = useDataSaga<DataActionType.DELETE_GOAL>(DataActionType.DELETE_GOAL, {onSucceed})

  useEffect(()=>{
    if (!loggedInUserId) return;

    getGoalsFetch({input:{
      author: loggedInUserId
    }})
  },[getGoalsFetch, loggedInUserId])

  const handleCreate = useCallback(()=>{
    if (!loggedInUserId) return;

    createGoalFetch({
      input: {
        author: loggedInUserId,
        name: "new goal",
        color: "white",
        readPermission: "everyone"
      }
    })
  },[createGoalFetch, loggedInUserId])

  const handleUpdate = useCallback((id: string)=>{
    updateGoalFetch({
      id,
      input: {
        name: "updated goal",
        color:"yellow",
        readPermission: "everyone"
      }
    })
  },[updateGoalFetch])

  const handleDelete = useCallback((id: string)=>{
    deleteGoalFetch({
      id,
    })
  },[deleteGoalFetch])

  return (
    <LayoutNavigation>
      <S.Button onClick={handleCreate}>CREATE</S.Button>

      <S.ListGoal>
        {(getGoalsData?.goals || []).map(item => (
          <S.ListItemGoal key={item._id}>
            <S.IdGoal>{item._id}</S.IdGoal>
            <S.NameGoal>{item.name}</S.NameGoal>
            <button onClick={()=>handleDelete(item._id)}>삭제</button>
            <button onClick={()=>handleUpdate(item._id)}>업데이트</button>
          </S.ListItemGoal>
        ))}
      </S.ListGoal>
    </LayoutNavigation>   
  )
}

export default TestGoalsPage