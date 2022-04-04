import type {NextPage} from "next"
import React, {useCallback, useEffect, useMemo} from "react"
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";
import * as S from "styles/pages/test/tasks.styled";

const TestTasksPage: NextPage = () => {
  const {data: loggedInUserData} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA)
  const {fetch: getTasksByDaysFetch, data: getTasksByDaysData, refetch: getTasksByDaysRefetch} = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS)
  
  const {fetch: createTaskFetch, status: createTaskStatus} = useDataSaga<DataActionType.CREATE_TASK>(DataActionType.CREATE_TASK)
  const {fetch: updateTaskFetch, status: updateTaskStatus} = useDataSaga<DataActionType.UPDATE_TASK>(DataActionType.UPDATE_TASK)
  const {fetch: deleteTaskFetch, status: deleteTaskStatus} = useDataSaga<DataActionType.DELETE_TASK>(DataActionType.DELETE_TASK)

  useEffect(()=>{
    console.log("loggedInUserData: ", loggedInUserData); // TODO: remove 
  },[loggedInUserData])

  useEffect(()=>{
    getTasksByDaysFetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date("2222-11-11"),
    })
  },[getTasksByDaysFetch])

  const handleCreate = useCallback(()=>{
    createTaskFetch({
      data: {
        title: "new task",
        goal: "goal1",
        doneAt: new Date().getTime(),
        readPermission: "everyone"
      }
    })
  },[createTaskFetch])

  const handleUpdate = useCallback((id: string)=>{
    updateTaskFetch({
      pathSegments: [id],
      data: {
        title: "updated task",
      }
    })
  },[updateTaskFetch])

  const handleDelete = useCallback((id: string)=>{
    deleteTaskFetch({
      pathSegments: [id]
    })
  },[deleteTaskFetch])

  useEffect(()=>{
    if (createTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, createTaskStatus])

  useEffect(()=>{
    if (updateTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, updateTaskStatus])

  useEffect(()=>{
    if (deleteTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, deleteTaskStatus])

  return (
    <LayoutNavigation>
      <S.Button onClick={handleCreate}>CREATE</S.Button>

      <S.ListTask>
        {(getTasksByDaysData || []).map(item => (
          <S.ListItemTask key={item.id}>
            <S.IdTask>{item.id}</S.IdTask>
            <S.TitleTask>{item.title}</S.TitleTask>
            <button onClick={()=>handleDelete(item.id)}>삭제</button>
            <button onClick={()=>handleUpdate(item.id)}>업데이트</button>
          </S.ListItemTask>
        ))}
      </S.ListTask>
    </LayoutNavigation>   
  )
}

export default TestTasksPage