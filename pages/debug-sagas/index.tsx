import type {NextPage} from "next"
import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"
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

  const handleDelete = useCallback(()=>{
    if (!createTaskState.response.)
    dispatch(queryStore.return__DELETE_TASK({
      pathSegments: []
    }))
  },[])
  
  return (
    <div>
      DebugSagas
      <button onClick={handleCreate}>create task</button>

    </div>   
  )
}

export default DebugSagasPage