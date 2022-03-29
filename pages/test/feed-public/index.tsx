import type {NextPage} from "next"
import React, {useEffect, useMemo} from "react"
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType} from "stores/data";
import * as S from "styles/pages/test/feed-public.styled";

const TestFeedPublicPage: NextPage = () => {
  const {fetch: getPublicTasksFetch, data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const {fetch: getGoalsByIdFetch, data: getGoalsByIdData} = useDataSaga<DataActionType.GET_GOALS_BY_ID>(DataActionType.GET_GOALS_BY_ID)

  const taskGoalIdList = useMemo(()=>{
    const taskGoalIdList:Set<string> = new Set(getPublicTasksData?.map(item => item.goal));
    return Array.from(taskGoalIdList);
  },[getPublicTasksData]);

  const publicTasksAndGoals = useMemo(()=>{
    if(!getPublicTasksData || !getGoalsByIdData) return;

    const publicTasksAndGoals = getPublicTasksData.map(task => {
      const goal = getGoalsByIdData.find(goal => task.goal === goal.id);
      return {task, goal};
    });

    return publicTasksAndGoals;
  },[getPublicTasksData,getGoalsByIdData]);
  
  useEffect(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])


  useEffect(()=>{
    getGoalsByIdFetch({
      id: taskGoalIdList,
    })
  },[getGoalsByIdFetch,taskGoalIdList])

  return (
    <LayoutNavigation>
      <S.ListTask>
        {(publicTasksAndGoals || []).map(item => (
          <S.ListItemTask key={item.task.id}>
            <S.TitleTask>goal name: {item.goal?.name}</S.TitleTask>
            <S.IdTask>goal color: {item.goal?.color}</S.IdTask>
            <S.TitleTask>{item.task.title}</S.TitleTask>
            <S.IdTask>author: {item.task.author}</S.IdTask>
          </S.ListItemTask>
        ))}
      </S.ListTask>
    </LayoutNavigation>   
  )
}

export default TestFeedPublicPage