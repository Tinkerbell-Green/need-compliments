import type {NextPage} from "next"
import React, {useCallback, useEffect, useMemo, useState} from "react"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {ActionType, QueryActionType, useQuery} from "stores/query";

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
    // dispatch(queryStore.return__CREATE_TASK({
    //   data: {
    //     title: "2222",
    //     category: "category1", 
    //     doneAt: "2022-2-22", 
    //     author: "wiz"
    //   }
    // }))
  },[fetch])

  console.log(state?.response)


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