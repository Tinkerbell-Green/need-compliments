import type {NextPage} from "next"
import React, {useEffect} from "react"
import {LayoutNavigation} from "components/layout-navigation/layout-navigation.styled";
import {dataStore} from "stores";
import {useDataSaga} from "stores/data";

const TestPage: NextPage = () => {
  const {fetch, data} = useDataSaga<dataStore.ActionType.GET_TASKS_BY_DAYS>(dataStore.ActionType.GET_TASKS_BY_DAYS)

  useEffect(()=>{
    fetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date(),
    })
  },[fetch])

  return (
    <LayoutNavigation
      title="test"
    >
      Test
    </LayoutNavigation>   
  )
}

export default TestPage