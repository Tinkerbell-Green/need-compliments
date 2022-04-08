import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState, useEffect,useMemo} from "react";
import {Seo} from "components/atoms/seo";
import {Snackbar} from "components/atoms/snackbar";
import {Tabs} from "components/moleculs/tabs";
import {FeedNotice} from "components/organisms/feedNotice";
import {FeedPublic} from "components/organisms/feedPublic";
import {LayoutMain} from "components/templates/layout-main"
import {wrapper} from "stores";
import {useDataSaga, DataActionType,TaskData,GoalData, dataActionCreators, DataSagaStatus} from "stores/data";
import {waitDuringLoading} from "stores/data/ssr";
import {SnackbarType} from "stores/data/types";
import * as S from "styles/pages/index.styled";

type SnackbarProps = {
  visible: boolean,
  message: string,
  type: SnackbarType
  duration?:number,
}

const Home: NextPage = () => {
  const {data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const {data: getGoalsByIdsData} = useDataSaga<DataActionType.GET_GOALS_BY_IDS>(DataActionType.GET_GOALS_BY_IDS)
  const router = useRouter();
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    visible: false,
    message: "",
    type: "information",
    duration:1000,
  });
  const tabIndex = useMemo(()=>{
    return router.query.tab;
  },[router.query.tab])

  const publicTasksAndGoals = useMemo(()=>{
    if(!getPublicTasksData || !getGoalsByIdsData) return;

    const publicTasksAndGoals:{task: TaskData, goal: GoalData}[] = [];

    getPublicTasksData.forEach(task => {
      const goal = getGoalsByIdsData.find(goal => task.goal === goal.id);
      // Filter out tasks whose goal was already removed.
      if(goal) publicTasksAndGoals.push({task,goal});
    });

    return publicTasksAndGoals.sort((a,b)=> b.task.createdAt - a.task.createdAt);
  },[getPublicTasksData,getGoalsByIdsData]);

  return (
    <LayoutMain>
      <Seo title={"전체 글"}></Seo>
      <Snackbar
        {...snackbarProps}
        onClose={()=>setSnackbarProps({...snackbarProps, visible:false})}></Snackbar>
      <Tabs/>
      {tabIndex==="0" && <FeedPublic tasksAndGoals={publicTasksAndGoals || []}/>}
      {tabIndex==="1" && <FeedNotice/>}
    </LayoutMain>
  );
};
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

  const goals = Array.from(new Set(tasksGoal))

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

  return ({
    props: {}
  })
});

export default Home;
