import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {useDataSaga, DataActionType} from "stores/data";

const TestPage: NextPage = () => {
  const {fetch} = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS)
  const {fetch: createTaskFetch} = useDataSaga<DataActionType.CREATE_TASK>(DataActionType.CREATE_TASK)

  useEffect(()=>{
    fetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date(),
    })
  },[fetch])

  const handleCreate = useCallback(()=>{
    createTaskFetch({
      title: "new task",
      goal: "goal1",
      author: "",
      doneAt: new Date().getTime()
    })
  },[createTaskFetch])

  return (
    <LayoutNavigation
      title="test"
    >
      Test
      <button onClick={handleCreate}>create!</button>
    </LayoutNavigation>   
  )
}

export default TestPage