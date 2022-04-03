import type {NextPage} from "next"
import React, {useCallback, useEffect, useMemo, useState} from "react"
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";
import * as S from "styles/pages/test/tasks.styled";

const TestTasksPage: NextPage = () => {
  const [createdComplimentId, setCreatedComplimentId] = useState<string | undefined>()

  const {fetch: getTasksByDaysFetch, data: getTasksByDaysData, refetch: getTasksByDaysRefetch} = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS)
  
  const onCreateSucceed = useCallback((data)=>{
    setCreatedComplimentId(data.)
  },[])

  const {fetch: createComplimentFetch, status: createComplimentStatus} = useDataSaga<DataActionType.CREATE_COMPLIMENT>(DataActionType.CREATE_COMPLIMENT, {
    onSucceed: onCreateSucceed
  })
  const {fetch: deleteComplimentFetch, status: deleteComplimentStatus} = useDataSaga<DataActionType.DELETE_COMPLIMENT>(DataActionType.DELETE_COMPLIMENT)


  useEffect(()=>{
    getTasksByDaysFetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date("2222-11-11"),
    })
  },[getTasksByDaysFetch])

  const handleCreate = useCallback((taskId: string)=>{
    createComplimentFetch({
      data: {
        task: taskId,
        type: "clapping-hands"
      }
    })
  },[createComplimentFetch])

  const handleDelete = useCallback(()=>{
    if (!createdComplimentId) return;
    
    deleteComplimentFetch({
      pathSegments: [createdComplimentId]
    })
  },[createdComplimentId, deleteComplimentFetch])

  return (
    <LayoutNavigation>
      <S.ListTask>
        {(getTasksByDaysData || []).map(item => (
          <S.ListItemTask key={item.id}>
            <S.IdTask>{item.id}</S.IdTask>
            <S.TitleTask>{item.title}</S.TitleTask>
            <button onClick={()=>handleCreate(item.id)}>create compliment</button>
            <button onClick={()=>handleDelete()}>delete compliment</button>
          </S.ListItemTask>
        ))}
      </S.ListTask>
    </LayoutNavigation>   
  )
}

export default TestTasksPage