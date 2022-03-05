import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {useDataSaga} from "stores/data";

const TestPage: NextPage = () => {
  const {fetch, state, key} = useDataSaga<ActionType.CREATE_TASK>(ActionType.CREATE_TASK)

  const handleCreate = useCallback(()=>{
    fetch({
      data: {
        title: "2222",
        category: "category1", 
        doneAt: "2022-2-22", 
        author: "wiz"
      }
    })
  },[fetch])

  return (
    <LayoutNavigation
      title="test"
    >
      Test
      <button onClick={handleCreate}>create task</button>
      
    </LayoutNavigation>   
  )
}

export default TestPage