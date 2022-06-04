import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useState, useEffect,useMemo, useRef} from "react";
import {useSelector} from "react-redux";
import {Seo} from "components/atoms/seo";
import {Snackbar,SnackbarProps} from "components/atoms/snackbar";
import {Calendar} from "components/organisms/calendar"
import {FeedPersonal} from "components/organisms/feedPersonal";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType, DataSagaStatus, UserData, TaskData,GoalData} from "stores/data";
import {SnackbarType,GoalColor} from "stores/data/types";
import {RootState} from "stores/reducers";
import * as S from "styles/pages/feed.styled";
import {Dayjs} from "utils/dayjs";
import {useSnackbar} from "utils/snackbarify/snackbarHooks";
import {SnackbarifyContainer} from "utils/snackbarify/snackbarifyContainer";

export type ExpandedUserData = Pick<UserData, "name" | "email"> & {
	follwersCount: number;
	follwingsCount: number;
};

export type ExpandedTaskData = TaskData & {
  color?: GoalColor
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
  } = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA);
  const {
    fetch: getTasksByDaysFetch,
    status: getTasksByDaysStatus,
    data: getTasksByDaysData,
    refetch: getTasksByDaysRefetch,
  } = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS);
  const {
    fetch: createTaskFetch, 
    status: createTaskStatus
  } = useDataSaga<DataActionType.CREATE_TASK>(DataActionType.CREATE_TASK);
  const {
    fetch: deleteTaskFetch, 
    status: deleteTaskStatus
  } = useDataSaga<DataActionType.DELETE_TASK>(DataActionType.DELETE_TASK);
  const {
    fetch: updateTaskFetch, 
    status: updateTaskStatus
  } = useDataSaga<DataActionType.UPDATE_TASK>(DataActionType.UPDATE_TASK);
  const {
    fetch: getGoalsFetch, 
    data: getGoalsData,
    status: getGoalssStatus
  } = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);
  const pageAuthorId = useSelector(
    (state: RootState) => state.navigation.pageAuthorId
  );

  const [tasks, setTasks] = useState<TaskData[]>(getTasksByDaysData || []);
  const [pickedDate,setPickedDate]=useState(Dayjs().format("DDMMYYYY"))
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({message:""});
  const feedRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [isSnackbarVisible, setIsSnackbarVisible] = useSnackbar();

  const handleSnackbarShowClick = useCallback(() => {
    setIsSnackbarVisible(true);
  }, [setIsSnackbarVisible]);

  const handleSnackbarHideClick = useCallback(() => {
    setIsSnackbarVisible(false);
  }, [setIsSnackbarVisible]);

  const handleDateClick = useCallback((date:string)=>{
    setPickedDate(date);
    feedRef?.current?.scrollIntoView();
  },[])

  const handleTaskDelete = useCallback((id: string)=>{
    deleteTaskFetch({
      pathSegments: [id]
    })
  },[deleteTaskFetch])

  const handleTaskCreate = useCallback(
    (id: string, readPermission: GoalData["readPermission"]) => {
      createTaskFetch({
        data: {
          title: "",
          goal:id,
          doneAt: Dayjs(pickedDate,"DDMMYYYY").toDate().getTime(),
          readPermission,
        },
      });
    },
    [createTaskFetch,pickedDate]
  );

  const handleTaskUpdate = useCallback((id:string,title:string)=>{
    updateTaskFetch({
      pathSegments: [id],
      data: {
        title,
      }});
  },[updateTaskFetch])

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

  const goalTasksAtPickedDate = useMemo(()=>{
    const newGoalTasksAtPickedDate: Record<string, TaskData[]> = {};

    goals.forEach(goal=>{
      newGoalTasksAtPickedDate[goal.id] = tasks.filter(taskItem => 
        taskItem.goal === goal.id && Dayjs(taskItem.doneAt).format("DDMMYYYY") === pickedDate)})

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
    if (createTaskStatus === DataSagaStatus.SUCCEEDED 
      || deleteTaskStatus === DataSagaStatus.SUCCEEDED 
      || updateTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, createTaskStatus,deleteTaskStatus,updateTaskStatus])
  
  useEffect(()=>{
    if(loggedInUserStatus===DataSagaStatus.FAILED){
      setSnackbarProps({
        message: LOGIN_ERROR,
        type: "error",
      })
      handleSnackbarShowClick();
    }
  },[loggedInUserStatus,handleSnackbarShowClick])

  useEffect(()=>{
    if(getTasksByDaysStatus===DataSagaStatus.FAILED){
      setSnackbarProps({
        message: GET_TASKS_ERROR,
        type: "error",
      })
      handleSnackbarShowClick()
    }
  },[getTasksByDaysStatus,handleSnackbarShowClick])

  useEffect(()=>{
    if(createTaskStatus===DataSagaStatus.FAILED 
      || updateTaskStatus===DataSagaStatus.FAILED 
      || deleteTaskStatus===DataSagaStatus.FAILED){
      setSnackbarProps({
        message: MODIFY_TASKS_ERROR,
        type: "error",
      })
      handleSnackbarShowClick()
    }
  },[createTaskStatus,updateTaskStatus,deleteTaskStatus,handleSnackbarShowClick])

  useEffect(()=>{
    if(updateTaskStatus===DataSagaStatus.SUCCEEDED){
      setSnackbarProps({
        message: UPDATE_TASKS_SUCCESS,
        type: "success",
      })
      handleSnackbarShowClick()
    }
  },[updateTaskStatus,handleSnackbarShowClick])

  const snackbar = useCallback(() => (
    <Snackbar
      message={snackbarProps.message}
      type={snackbarProps?.type}
      duration={4000}
      onCloseClick={handleSnackbarHideClick}
    />
  ),[handleSnackbarHideClick,snackbarProps.message, snackbarProps.type])

  return (
    <LayoutMain>
      <SnackbarifyContainer
        visible={isSnackbarVisible}
        duration={4000}
        Snackbar={snackbar}
      ></SnackbarifyContainer>
      <Seo title={`${loggedInUserData?.name || ""} 피드`}></Seo>
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
