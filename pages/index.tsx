import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useState, useEffect,useMemo} from "react";
import {Seo} from "components/atoms/seo";
import {Snackbar} from "components/atoms/snackbar";
import {Tabs} from "components/moleculs/tabs";
import {FeedNotice} from "components/organisms/feedNotice";
import {FeedPublic} from "components/organisms/feedPublic";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType, TaskData,GoalData} from "stores/data";
import {SnackbarType} from "stores/data/types";
import * as S from "styles/pages/index.styled";

type SnackbarProps = {
  visible: boolean,
  message: string,
  type: SnackbarType
  duration?:number,
}

const Home: NextPage = () => {
  const {fetch: getPublicTasksFetch, data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const {fetch: getGoalsByIdsFetch, data: getGoalsByIdsData} = useDataSaga<DataActionType.GET_GOALS_BY_IDS>(DataActionType.GET_GOALS_BY_IDS)
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

    return publicTasksAndGoals.sort((a,b)=> b.task.createdAt - a.task.createdAt);
  },[getPublicTasksData,getGoalsByIdsData]);
  
  useEffect(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])


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

export default Home;
