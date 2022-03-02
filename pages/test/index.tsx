import type {NextPage} from "next"
import React, {useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {queryStore} from "stores";
import {RootState} from "stores/reducers";

const TestPage: NextPage = () => {
  const dispatch = useDispatch()
  const createTaskState = useSelector((state: RootState) => state.query.createTask);

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
  
  return (
    <LayoutNavigation>
      Test
      <button onClick={handleCreate}>create task</button>
      <button onClick={handleDelete}>delete task</button>
    </LayoutNavigation>   
  )
}

export default TestPage