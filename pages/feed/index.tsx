import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useState, useEffect,useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {UserData} from "api"
import {TaskData, GoalData, GoalColor} from "api"
import {Seo} from "components/atoms/seo";
import {Snackbar} from "components/atoms/snackbar";
import {Calendar} from "components/organisms/calendar"
import {FeedPersonal} from "components/organisms/feedPersonal";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";
import {SnackbarType} from "stores/data/types";
import {RootState} from "stores/reducers";
import * as S from "styles/pages/feed.styled";
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

const Feed: NextPage = () => {
  const {
    data: loggedInUserData,
    status: loggedInUserStatus
  } = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA, []);
  const {
    fetch: getTasksByDaysFetch,
    status: getTasksByDaysStatus,
    data: getTasksByDaysData,
    refetch: getTasksByDaysRefetch,
  } = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS, []);
  const {
    fetch: createTaskFetch, 
    status: createTaskStatus
  } = useDataSaga<DataActionType.CREATE_TASK>(DataActionType.CREATE_TASK, []);
  const {
    fetch: deleteTaskFetch, 
    status: deleteTaskStatus
  } = useDataSaga<DataActionType.DELETE_TASK>(DataActionType.DELETE_TASK, []);
  const {
    fetch: updateTaskFetch, 
    status: updateTaskStatus
  } = useDataSaga<DataActionType.UPDATE_TASK>(DataActionType.UPDATE_TASK, []);
  const {
    fetch: getGoalsFetch, 
    data: getGoalsData,
    status: getGoalssStatus
  } = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS, []);
  const pageAuthorId = useSelector(
    (state: RootState) => state.navigation.pageAuthorId
  );

  const [tasks, setTasks] = useState<NonNullable<typeof getTasksByDaysData>["tasks"]>(getTasksByDaysData?.tasks || [] );
  const [pickedDate,setPickedDate]=useState(Dayjs().format("DDMMYYYY"))
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    visible: false,
    message: "",
    type: "information",
    duration:1000,
  });
  const feedRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const handleDateClick = useCallback((date:string)=>{
    setPickedDate(date);
    feedRef?.current?.scrollIntoView();
  },[])

  const handleTaskDelete = useCallback((id: string)=>{
    deleteTaskFetch({
      id,
    })
  },[deleteTaskFetch])

  const handleTaskCreate = useCallback(
    (id: string, readPermission: GoalData["readPermission"]) => {
      if (!loggedInUserData?.user.userId) return;

      createTaskFetch({
        input: {
          author: loggedInUserData?.user.userId,
          title: "",
          goal:id,
          doneAt: Dayjs(pickedDate,"DDMMYYYY").toDate().getTime(),
          readPermission,
        },
      });
    },
    [createTaskFetch, loggedInUserData?.user.userId, pickedDate]
  );

  const handleTaskUpdate = useCallback((id:string,title:string)=>{
    if (!loggedInUserData?.user.userId) return;

    updateTaskFetch({
      id,
      input: {
        title,
      }});
  },[loggedInUserData?.user.userId, updateTaskFetch])

  const handleSnackbarShow = useCallback(()=>{
    setSnackbarProps({
      visible:true,
      message:NEXT_FEATURE,
      type:"information",
      duration:5000,
    })
  },[])

  const goals = useMemo(() => {
    return (getGoalsData?.goals || []).sort((a, b) => a.createdAt - b.createdAt);
  }, [getGoalsData]);

  const tasksByDate = useMemo(()=>{
    const newTasks: Record<string,ExpandedTaskData[]> = {};

    tasks.forEach((taskItem)=>{
      goals.forEach((goal)=>{
        if(taskItem.goal !== goal._id) return;

        const curDate = Dayjs(taskItem.doneAt).format("DDMMYYYY");
  
        if(newTasks[curDate]) newTasks[curDate].push({...taskItem, color:goal.color ? goal.color : "white"});
        else newTasks[curDate] = [{...taskItem, color:goal.color}];
      })
    })

    return newTasks;
  },[tasks,goals])

  const goalTasksAtPickedDate = useMemo(()=>{
    const newGoalTasksAtPickedDate: Record<string, TaskData[]> = {};

    goals.forEach(goal=>{
      newGoalTasksAtPickedDate[goal._id] = tasks.filter(taskItem => 
        taskItem.goal === goal._id && Dayjs(taskItem.doneAt).format("DDMMYYYY") === pickedDate)})

    return newGoalTasksAtPickedDate;
  },[goals,tasks,pickedDate])

  useEffect(()=>{
    if(!pageAuthorId) return;
    
    router.push({
      query : {
        id:pageAuthorId,
        date:`${pickedDate}`,
      },
    },undefined, {shallow: true});
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pickedDate,pageAuthorId])
  
  useEffect(()=>{
    if (!loggedInUserData?.user.userId) return;

    getGoalsFetch({
      input: {
        author: loggedInUserData?.user.userId
      }
    })
  },[getGoalsFetch, loggedInUserData?.user.userId])

  useEffect(() => {
    setTasks(getTasksByDaysData?.tasks || []);
  }, [getTasksByDaysData]);

  useEffect(() => {
    getTasksByDaysFetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date("2222-11-11"),
    });
  }, [getTasksByDaysFetch]);

  useEffect(()=>{
    if (createTaskStatus === DataSagaStatus.SUCCEEDED 
      || deleteTaskStatus === DataSagaStatus.SUCCEEDED 
      || updateTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, createTaskStatus,deleteTaskStatus,updateTaskStatus])
  
  useEffect(()=>{
    if(loggedInUserStatus===DataSagaStatus.FAILED){
      setSnackbarProps({
        visible: true,
        message: LOGIN_ERROR,
        type: "error",
      })
    }
  },[loggedInUserStatus])

  useEffect(()=>{
    if(getTasksByDaysStatus===DataSagaStatus.FAILED){
      setSnackbarProps({
        visible: true,
        message: GET_TASKS_ERROR,
        type: "error",
      })
    }
  },[getTasksByDaysStatus])

  useEffect(()=>{
    if(createTaskStatus===DataSagaStatus.FAILED 
      || updateTaskStatus===DataSagaStatus.FAILED 
      || deleteTaskStatus===DataSagaStatus.FAILED){
      setSnackbarProps({
        visible: true,
        message: MODIFY_TASKS_ERROR,
        type: "error",
        duration:2000,
      })
    }
  },[createTaskStatus,updateTaskStatus,deleteTaskStatus])

  useEffect(()=>{
    if(updateTaskStatus===DataSagaStatus.SUCCEEDED){
      setSnackbarProps({
        visible: true,
        message: UPDATE_TASKS_SUCCESS,
        type: "success",
        duration:2000,
      })
    }
  },[updateTaskStatus])

  return (
    <LayoutMain>
      <Seo title={`${loggedInUserData?.user?.name || ""} 피드`}></Seo>
      <Snackbar 
        {...snackbarProps}
        onClose={()=>setSnackbarProps({...snackbarProps, visible:false})}></Snackbar>
      <S.Visible>
        <Calendar
          pickedDate={pickedDate}
          onDateClick={handleDateClick}
          tasksByDate={tasksByDate}></Calendar>
        <S.DetailSection ref={feedRef}>
          <FeedPersonal
            onTaskDelete={handleTaskDelete}
            onTaskCreate={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
            pickedDate={pickedDate}
            goalTasks={goalTasksAtPickedDate}
            goals={goals}></FeedPersonal>
        </S.DetailSection>
      </S.Visible>
    </LayoutMain>
  );
};

export default Feed;
