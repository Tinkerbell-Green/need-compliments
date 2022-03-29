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
  const {
    fetch: getTasksByDaysFetch,
    status: getTasksByDaysStatus,
    data: getTasksByDaysData,
    refetch: getTasksByDaysRefetch,
  } = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS);
  const {
    fetch: getGoalsFetch, 
    data: getGoalsData,
    status: getGoalssStatus
  } = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);
  const pageAuthorId = useSelector(
    (state: RootState) => state.navigation.pageAuthorId
  );

  const [tasks, setTasks] = useState<TaskData[]>(getTasksByDaysData || []);
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

  const goals = useMemo(() => {
    const newGoals = getGoalsData || [];
    newGoals.sort((a, b) => a.createdAt - b.createdAt);
    return newGoals;
  }, [getGoalsData]);

  const tasksByDate = useMemo(()=>{
    const newTasks: Record<string,ExpandedTaskData[]> = {};

    tasks.forEach((taskItem)=>{
      goals.forEach((goal)=>{
        if(taskItem.goal !== goal.id) return;

        const curDate = Dayjs(taskItem.doneAt).format("DDMMYYYY");
  
        if(newTasks[curDate]) newTasks[curDate].push({...taskItem, color:goal.color ? goal.color : "white"});
        else newTasks[curDate] = [{...taskItem, color:goal.color}];
      })
    })

    return newTasks;
  },[tasks,goals])
  
  useEffect(()=>{
    getGoalsFetch({})
  },[getGoalsFetch])

  useEffect(() => {
    setTasks(getTasksByDaysData || []);
  }, [getTasksByDaysData]);

  useEffect(() => {
    getTasksByDaysFetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date("2222-11-11"),
    });
  }, [getTasksByDaysFetch]);

  useEffect(()=>{
    if(getTasksByDaysStatus===DataSagaStatus.FAILED){
      setSnackbarProps({
        visible: true,
        message: GET_TASKS_ERROR,
        type: "error",
      })
    }
  },[getTasksByDaysStatus])

  return (
    <LayoutMain>
      <Seo title={"전체 글"}></Seo>
      <Snackbar 
        {...snackbarProps}
        onClose={()=>setSnackbarProps({...snackbarProps, visible:false})}></Snackbar>
      <Tabs/>
      <FeedPublic/>
    </LayoutMain>
  );
};

export default Home;
