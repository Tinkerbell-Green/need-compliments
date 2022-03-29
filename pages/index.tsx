import type {NextPage} from "next";
import React, {useCallback, useState, useEffect,useMemo} from "react";
import {useSelector} from "react-redux";
import {Seo} from "components/atoms/seo";
import {Snackbar} from "components/atoms/snackbar";
import {Tabs} from "components/moleculs/tabs";
import {FeedPublic} from "components/organisms/feedPublic";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType, DataSagaStatus, UserData, TaskData,GoalData} from "stores/data";
import {SnackbarType,GoalColor} from "stores/data/types";
import {RootState} from "stores/reducers";
import * as S from "styles/pages/index.styled";
import {Dayjs} from "utils/dayjs";

export type ExpandedUserData = Pick<UserData, "name" | "email"> & {
	follwersCount: number;
	follwingsCount: number;
};

export type ExpandedTaskData = TaskData & {
  color?: GoalColor
}

type SnackbarProps = {
  visible: boolean,
  message: string,
  type: SnackbarType
  duration?:number,
}

const LOGIN_ERROR = "일시적인 오류로 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요."
const GET_TASKS_ERROR = "일시적인 오류로 데이터를 가져오는데 실패했습니다. 잠시 후 다시 시도해 주세요."
const MODIFY_TASKS_ERROR = "일시적인 오류로 데이터를 저장하는데 실패했습니다. 잠시 후 다시 시도해 주세요."
const UPDATE_TASKS_SUCCESS = "데이터를 성공적으로 저장했습니다 🧚‍♀️"
const NEXT_FEATURE ="준비 중인 기능입니다. 그동안 캘린더를 채워보는건 어떨까요? 🧚‍♀️";

const Home: NextPage = () => {
  const {fetch: getPublicTasksFetch, data: getPublicTasksData} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const {fetch: getGoalsByIdsFetch, data: getGoalsByIdsData} = useDataSaga<DataActionType.GET_GOALS_BY_IDS>(DataActionType.GET_GOALS_BY_IDS)

  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    visible: false,
    message: "",
    type: "information",
    duration:1000,
  });

  const handleSnackbarShow = useCallback(()=>{
    setSnackbarProps({
      visible:true,
      message:NEXT_FEATURE,
      type:"information",
      duration:5000,
    })
  },[])

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
      <FeedPublic tasksAndGoals={publicTasksAndGoals || []}/>
    </LayoutMain>
  );
};

export default Home;
