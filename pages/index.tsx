import {chunk} from "lodash";
import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useMemo, useEffect} from "react";
import {Seo} from "components/atoms/seo";
import {Tabs} from "components/moleculs/tabs";
import {FeedNotice} from "components/organisms/feedNotice";
import {FeedPublic} from "components/organisms/feedPublic";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType,TaskData,GoalData} from "stores/data";

const Home: NextPage = () => {
  const {fetch: getPublicTasksFetch, data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const {fetch: getGoalsByIdsFetch, data: getGoalsByIdsData} = useDataSaga<DataActionType.GET_GOALS_BY_IDS>(DataActionType.GET_GOALS_BY_IDS)
  const router = useRouter();

  useEffect(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])

  useEffect(()=>{
    const tasksGoal = (getPublicTasksData || []).map(item => item.goal)

    const goals = Array.from(new Set(tasksGoal))
    const goalGroups = chunk(goals,10);

    goalGroups.forEach(goals => {
      getGoalsByIdsFetch({
        ids: goals,
      })
    })
  },[getGoalsByIdsFetch, getPublicTasksData])
  
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
      <Tabs/>
      {tabIndex==="0" && <FeedPublic tasksAndGoals={publicTasksAndGoals || []}/>}
      {tabIndex==="1" && <FeedNotice/>}
    </LayoutMain>
  );
};

export default Home;
