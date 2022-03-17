import {Menu} from "@styled-icons/feather";
import {GolfCourse} from "@styled-icons/material-twotone";
import type {NextPage} from "next";
import React, {useCallback, useState, useEffect,useMemo} from "react";
import * as S from "./index.styled";
import {Calendar} from "components/calendar"
import {Feed} from "components/organisms/feed";
import {Sidebar} from "components/sidebar";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType, DataSagaStatus, UserData, TaskData, GoalData} from "stores/data";
import {Dayjs} from "utils/dayjs";

export type ExpandedUserData = Pick<UserData, "name" | "email"> & {
	follwersCount: number;
	follwingsCount: number;
};
export type ReducedGoalData = Pick<GoalData,"id"|"name"|"color">;
export type ExpandedTaskData = TaskData & {
  color?: string
}

const Home: NextPage = () => {
  const {
    data: loggedInUserData
  } = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA);
  const {
    fetch: getTasksByDaysFetch,
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
  const [goals,setGoals]= useState<ReducedGoalData[]>([]);
  const [pickedDate,setPickedDate]=useState(Dayjs().format("DD/MM/YYYY"))
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [follwersCount, setFollwersCount] = useState(0);
  const [follwingsCount, setFollwingsCount] = useState(0);

  useEffect(() => {
    if (loggedInUserData) {
      setName(loggedInUserData.name);
      setEmail(loggedInUserData.email);
      setFollwersCount(loggedInUserData.followers.length);
      setFollwingsCount(loggedInUserData.followings.length);
    }
  }, [loggedInUserData]);
  
  useEffect(()=>{
    getGoalsFetch({})
  },[getGoalsFetch])

  useEffect(() => {
    setTasks(getTasksByDaysData || []);
  }, [getTasksByDaysData]);

  useEffect(()=>{
    getGoalsData && setGoals(getGoalsData.map(({id,name,color})=>({id, name, color})));
  },[getGoalsData]);

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
          doneAt: Dayjs(pickedDate,"DD/MM/YYYY").toDate().getTime(),
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

    goals.forEach((goal)=>{
      tasks.forEach((taskItem)=>{
        if(taskItem.goal !== goal.id) return;

        const curDate = Dayjs(taskItem.doneAt).format("DD/MM/YYYY");
  
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
        taskItem.goal === goal.id && Dayjs(taskItem.doneAt).format("DD/MM/YYYY") === pickedDate)})

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
      <S.IconList>
        <S.MenuIcon onClick={handleOpenMenu}>
          <Menu />
        </S.MenuIcon>
      </S.IconList>
      <div className="visible">
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
      </div>
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
