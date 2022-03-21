import {Menu} from "@styled-icons/feather";
import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useState, useEffect,useMemo} from "react";
import * as S from "./index.styled";
import {Snackbar} from "components/atoms/snackbar";
import {Calendar} from "components/organisms/calendar"
import {Feed} from "components/organisms/feed";
import {Sidebar} from "components/organisms/sidebar";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType, DataSagaStatus, UserData, TaskData, GoalData} from "stores/data";
import {SnackbarType} from "stores/data/types";
import {Dayjs} from "utils/dayjs";

export type ExpandedUserData = Pick<UserData, "name" | "email"> & {
	follwersCount: number;
	follwingsCount: number;
};

export type ExpandedTaskData = TaskData & {
  color?: string
}

const LOGIN_ERROR = "일시적인 오류로 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요."
const GET_TASKS_ERROR = "일시적인 오류로 데이터를 가져오는데 실패했습니다. 잠시 후 다시 시도해 주세요."
const MODIFY_TASKS_ERROR = "일시적인 오류로 데이터를 저장하는데 실패했습니다. 잠시 후 다시 시도해 주세요."
const MODIFY_TASKS_SUCCESS = "회원님의 데이터를 안전하게 저장했습니다😉"

const Home: NextPage = () => {
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
  } = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);

  const [tasks, setTasks] = useState<TaskData[]>(getTasksByDaysData || []);
  const [pickedDate,setPickedDate]=useState(Dayjs().format("DDMMYYYY"))
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [follwersCount, setFollwersCount] = useState(0);
  const [follwingsCount, setFollwingsCount] = useState(0);
  const [isSnackbarShow, setIsSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("information");

  const router = useRouter();
  useEffect(() => {
    if (loggedInUserData) {
      setName(loggedInUserData.name);
      setEmail(loggedInUserData.email);
      setFollwersCount(loggedInUserData.followers.length);
      setFollwingsCount(loggedInUserData.followings.length);
    }
  }, [loggedInUserData]);

  useEffect(()=>{
    if(loggedInUserStatus===DataSagaStatus.FAILED){
      setSnackbarMessage(LOGIN_ERROR);
      setIsSnackbarShow(true);
    }
  },[loggedInUserStatus])

  useEffect(()=>{
    if(getTasksByDaysStatus===DataSagaStatus.FAILED){
      setSnackbarMessage(GET_TASKS_ERROR);
      setIsSnackbarShow(true);
      setSnackbarType("error");
    }
  },[getTasksByDaysStatus])

  useEffect(()=>{
    if(createTaskStatus===DataSagaStatus.FAILED 
      || updateTaskStatus===DataSagaStatus.FAILED 
      || deleteTaskStatus===DataSagaStatus.FAILED){
      setSnackbarMessage(MODIFY_TASKS_ERROR);
      setIsSnackbarShow(true);
      setSnackbarType("error");
    }
  },[createTaskStatus,updateTaskStatus,deleteTaskStatus])

  useEffect(()=>{
    if(createTaskStatus===DataSagaStatus.SUCCEEDED 
      || updateTaskStatus===DataSagaStatus.SUCCEEDED 
      || deleteTaskStatus===DataSagaStatus.SUCCEEDED){
      setSnackbarMessage(MODIFY_TASKS_SUCCESS);
      setIsSnackbarShow(true);
      setSnackbarType("success");
    }
  },[createTaskStatus,updateTaskStatus,deleteTaskStatus])

  useEffect(()=>{
    router.push({
      query : {
        // id:loggedInUserData?.id, TODO: 네비게이션에서 현재보고있는 feed의 아이디를 가져와야함.
        date:`${pickedDate}`,
      },
    },undefined, {shallow: true});
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pickedDate])
  
  useEffect(()=>{
    getGoalsFetch({})
  },[getGoalsFetch])

  useEffect(() => {
    setTasks(getTasksByDaysData || []);
  }, [getTasksByDaysData]);

  const goals = useMemo(() => {
    const newGoals = getGoalsData || [];
    newGoals.sort((a, b) => a.createdAt - b.createdAt);
    return newGoals;
  }, [getGoalsData]);

  const handleOpenMenu: React.MouseEventHandler = useCallback(() => {
    setIsMenuOpen(true);
  },[]);

  const handleCloseMenu: React.MouseEventHandler = useCallback((event) => {
    if ((event.target as HTMLElement).classList.contains("menuClose")) {
      setIsMenuOpen(false);
    }
  },[]);

  const handleDateClick = useCallback((date:string)=>{
    setPickedDate(date);
  },[])

  const handleTaskDelete = useCallback((id: string)=>{
    deleteTaskFetch({
      pathSegments: [id]
    })
  },[deleteTaskFetch])

  const handleTaskCreate = useCallback(
    (id: string) => {
      createTaskFetch({
        data: {
          title: "",
          goal:id,
          doneAt: Dayjs(pickedDate,"DDMMYYYY").toDate().getTime(),
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
  
  const tasksByDate = useMemo(()=>{
    const newTasks: Record<string,ExpandedTaskData[]> = {};

    tasks.forEach((taskItem)=>{
      goals.forEach((goal)=>{
        if(taskItem.goal !== goal.id) return;

        const curDate = Dayjs(taskItem.doneAt).format("DDMMYYYY");
  
        if(newTasks[curDate]) newTasks[curDate].push({...taskItem, color:goal.color});
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

  useEffect(() => {
    getTasksByDaysFetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date("2222-11-11"),
    });
  }, [getTasksByDaysFetch]);

  useEffect(()=>{
    if (createTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, createTaskStatus])
  
  useEffect(()=>{
    if (deleteTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, deleteTaskStatus])

  useEffect(() => {
    if (updateTaskStatus === DataSagaStatus.SUCCEEDED) {
      getTasksByDaysRefetch();
    }
  }, [getTasksByDaysRefetch, updateTaskStatus]);


  return (
    <LayoutMain>
      <Snackbar 
        visible={isSnackbarShow} 
        message={snackbarMessage} 
        type={snackbarType}
        onClose={()=>setIsSnackbarShow(false)}></Snackbar>
      <S.IconList>
        <S.MenuIcon onClick={handleOpenMenu}>
          <Menu />
        </S.MenuIcon>
      </S.IconList>
      <S.Visible>
        <Calendar
          pickedDate={pickedDate}
          onDateClick={handleDateClick}
          tasksByDate={tasksByDate}></Calendar>
        <S.DetailSection>
          <S.Profile>
            <S.Name>{name}</S.Name>
            <S.SecondaryName>{email}</S.SecondaryName>
          </S.Profile>
          <Feed 
            onTaskDelete={handleTaskDelete}
            onTaskCreate={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
            pickedDate={pickedDate}
            goalTasks={goalTasksAtPickedDate}
            goals={goals}></Feed>
        </S.DetailSection>
      </S.Visible>
      <div className="invisible">
        <Sidebar
          name={name}
          email={email}
          follwersCount={follwersCount}
          follwingsCount={follwingsCount}
          isMenuOpen={isMenuOpen}
          onCloseMenu={handleCloseMenu}
          goals={goals}
        ></Sidebar>
      </div>
    </LayoutMain>
  );
};

export default Home;
