import type {NextPage} from "next"
import React, {useEffect, useMemo} from "react"
import {LayoutNavigation} from "components/templates/layout-navigation";
import {wrapper} from "stores";
import {useDataSaga, DataActionType,TaskData,GoalData, dataActionCreators, DataSagaStatus} from "stores/data";
import {waitDuringLoading} from "stores/data/ssr";
import * as S from "styles/pages/test/feed-public.styled";

const TestSsrPage: NextPage = ({}) => {
  const {data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const {fetch: getGoalsByIdsFetch, data: getGoalsByIdsData} = useDataSaga<DataActionType.GET_GOALS_BY_IDS>(DataActionType.GET_GOALS_BY_IDS)

  const taskGoalIdList = useMemo(()=>{
    const taskGoalIdList:Set<string> = new Set(getPublicTasksData?.map(item => item.goal));
    return Array.from(taskGoalIdList);
  },[getPublicTasksData]);

  const publicTasksAndGoals = useMemo(()=>{
    if(!getPublicTasksData || !getGoalsByIdsData) return;

    const publicTasksAndGoals:{task: TaskData, goal: GoalData}[] = [];

    getPublicTasksData.forEach(task => {
      const goal = getGoalsByIdsData.find(goal => task.goal === goal.id);
      // Filter out tasks whose goal was already removed.
      if(goal) publicTasksAndGoals.push({task,goal});
    });

    return publicTasksAndGoals;
  },[getPublicTasksData,getGoalsByIdsData]);

  useEffect(()=>{
    const stack:string[] = [];
    console.log(taskGoalIdList)
    taskGoalIdList.forEach((value, index)=>{
      stack.push(value);

      if(index && stack.length%9===0){
        getGoalsByIdsFetch({
          ids: [...stack],
        })
        stack.splice(0,10);
      }
    })

    if(stack.length){
      getGoalsByIdsFetch({
        ids: [...stack],
      })
    }
    
  },[getGoalsByIdsFetch,taskGoalIdList])

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

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  const KEY = ""
  
  store.dispatch(dataActionCreators[DataActionType.GET_PUBLIC_TASKS]({
    author: undefined,
    key: KEY,
    startTime: new Date("1999-11-11"),
    endTime: new Date("2222-11-11"),
  }))

  await waitDuringLoading(store, {actionType: DataActionType.GET_PUBLIC_TASKS, key: KEY})

  return ({
    props: {}
  })
});

export default TestSsrPage
