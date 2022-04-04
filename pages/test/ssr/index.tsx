import type {NextPage} from "next"
import {useRouter} from "next/router";
import React, {useEffect, useMemo} from "react"
import {LayoutNavigation} from "components/templates/layout-navigation";
import {wrapper} from "stores";
import {useDataSaga, DataActionType,TaskData,GoalData, dataActionCreators, DataSagaStatus} from "stores/data";
import {waitDuringLoading} from "stores/data/ssr";
import * as S from "styles/pages/test/feed-public.styled";

const TestSsrPage: NextPage = ({}) => {
  const router = useRouter()
  const {data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const {data: getGoalsByIdsData} = useDataSaga<DataActionType.GET_GOALS_BY_IDS>(DataActionType.GET_GOALS_BY_IDS)

  useEffect(()=>{
    console.log("getPublicTasksData: ", getPublicTasksData?.length); // TODO: remove 
  },[getPublicTasksData])
  
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

  return (
    <LayoutNavigation>
      <div onClick={()=>router.push("/test/user")}>go to test/user</div>
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
  const GET_PUBLIC_TASKS_KEY = ""
  const GET_GOALS_BY_IDS_KEY = ""

  store.dispatch(dataActionCreators[DataActionType.GET_PUBLIC_TASKS]({
    author: undefined,
    key: GET_PUBLIC_TASKS_KEY,
    startTime: new Date("1999-11-11"),
    endTime: new Date("2222-11-11"),
  }))

  await waitDuringLoading(store, {actionType: DataActionType.GET_PUBLIC_TASKS, key: GET_PUBLIC_TASKS_KEY})

  const tasksGoal = store.getState().data[DataActionType.GET_PUBLIC_TASKS][GET_PUBLIC_TASKS_KEY].data?.map(item => item.goal)

  console.log("tasksGoal: ", tasksGoal?.length); // TODO: remove

  const goals = Array.from(new Set(tasksGoal))
  console.log("goals: ", goals); // TODO: remove

  const goalGroups = []
  while (goals.length > 0){
    goalGroups.push(goals.splice(0, 9))
  }

  goalGroups.map(item => {
    store.dispatch(dataActionCreators[DataActionType.GET_GOALS_BY_IDS]({
      author: undefined,
      key: GET_GOALS_BY_IDS_KEY,
      ids: item,
    }))
  })

  await waitDuringLoading(store, {actionType: DataActionType.GET_GOALS_BY_IDS, key: GET_GOALS_BY_IDS_KEY})

  const fetchedGoals = store.getState().data[DataActionType.GET_GOALS_BY_IDS][GET_GOALS_BY_IDS_KEY].data?.length
  console.log("fetchedGoals: ", fetchedGoals); // TODO: remove

  return ({
    props: {}
  })
});

export default TestSsrPage
