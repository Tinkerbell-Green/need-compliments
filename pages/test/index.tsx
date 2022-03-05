import type {NextPage} from "next"
import React, {useCallback, useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {queryStore} from "stores";
import {SagaStatus} from "stores/query/types";
import {RootState} from "stores/reducers";

const TestPage: NextPage = () => {
  const dispatch = useDispatch()
  const createTaskState = useSelector((state: RootState) => state.query.createTask);
  const getTaskState = useSelector((state: RootState) => state.query.getTask);
  const deleteTaskState = useSelector((state: RootState) => state.query.deleteTask);

  const [createdDocId, setCreatedDocId] = useState<string>()
  
  const handleCreate = useCallback(()=>{
    dispatch(queryStore.return__CREATE_TASK({
      data: {
        title: "2222",
        category: "category1", 
        doneAt: "2022-2-22", 
        author: "wiz"
      }
    }))
  },[dispatch])

  const handleDelete = useCallback(()=>{
    if (!createdDocId) return;
    dispatch(queryStore.return__DELETE_TASK({
      pathSegments: [createdDocId]
    }))
  },[createdDocId, dispatch])

  useEffect(()=>{
    setCreatedDocId(createTaskState.response?.id)
  },[createTaskState.response?.id])

  useEffect(()=>{
    if (!createdDocId) return;
    dispatch(queryStore.return__GET_TASK({
      pathSegments: [createdDocId]
    }))
  },[createdDocId, dispatch])

  useEffect(()=>{
    if (!createdDocId) return;
    if (deleteTaskState.status === SagaStatus.SUCCEEDED){
      dispatch(queryStore.return__GET_TASK({
        pathSegments: [createdDocId]
      }))
    }
  },[createdDocId, deleteTaskState.status, dispatch])
  
  const docData = getTaskState.response?.data()

  return (
    <LayoutNavigation
      title="test"
    >
      Test
      <button onClick={handleCreate}>create task</button>
      {docData && (
        <div>
          <div>{docData.title}</div>
          <div>{docData.category}</div>
          <div>{`by ${docData.author}`}</div>
        </div>
      )}
      {createdDocId && (
        <button onClick={handleDelete}>delete task</button>
      )}
    </LayoutNavigation>   
  )
}

export default TestPage