import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {ActionType, useQuery} from "stores/query";

const TestPage: NextPage = () => {
  const {fetch, state, key} = useQuery<ActionType.CREATE_TASK>(ActionType.CREATE_TASK)

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

  useEffect(()=>{
    console.log("state: ", state); // TODO: remove 
  },[state])


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