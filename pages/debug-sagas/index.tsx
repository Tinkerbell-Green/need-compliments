import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {queryStore} from "stores";
import {RootState} from "stores/reducers";

const DebugSagasPage: NextPage = () => {
  const dispatch = useDispatch()
  const createTaskState = useSelector((state: RootState) => state.query.createTask);
  
  const handleCreate = useCallback(()=>{
    dispatch(queryStore.return__CREATE_TASK({
      data: { // WIP:
        title: "test task!",
      }
    }))
  },[dispatch])

  useEffect(()=>{
    console.log("createTaskState: ", createTaskState); // TODO: remove 
  },[createTaskState])

  const handleDelete = useCallback(()=>{
    // dispatch(queryStore.return__DELETE_TASK({
    //   pathSegments: []
    // }))
  },[])
  
  return (
    <LayoutNavigation>
      DebugSagas
      <button onClick={handleCreate}>create task</button>
      <button onClick={handleDelete}>delete task</button>
    </LayoutNavigation>   
  )
}

export default DebugSagasPage