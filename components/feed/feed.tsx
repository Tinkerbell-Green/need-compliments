import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import React, {useState, useEffect, useCallback,useMemo} from "react";
import * as S from "./feed.styled";
import {TaskList} from "./task-list";
import {Chip} from "components/chip";
import {ReducedGoalData} from "pages";
import {
  useDataSaga,
  DataActionType,
  DataSagaStatus,
  TaskData,
} from "stores/data";

type FeedProps = {
	goals: ReducedGoalData[];
};

export const Feed = ({goals}: FeedProps) => {
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
  
  const [tasks, setTasks] = useState<TaskData[]>(getTasksByDaysData || []);

  useEffect(() => {
    getTasksByDaysFetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date("2222-11-11"),
    });
  }, [getTasksByDaysFetch]);

  useEffect(() => {
    setTasks(getTasksByDaysData || []);
  }, [getTasksByDaysData]);

  const handleTaskCreate = useCallback(
    (goal: string) => {
      createTaskFetch({
        data: {
          title: "",
          goal,
          doneAt: new Date().getTime(),
        },
      });
    },
    [createTaskFetch]
  );

  const handleTaskDelete = useCallback((id: string)=>{
    deleteTaskFetch({
      pathSegments: [id]
    })
  },[deleteTaskFetch])
  
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

  const goalTasks = useMemo(()=>{
    const newGoalTasks: Record<string, TaskData[]> = {};
    goals.forEach(goal=>{
      newGoalTasks[goal.id] = tasks.filter(taskItem => taskItem.goal === goal.name)
    })
    return newGoalTasks;
  },[goals,tasks])

  return (
    <S.Feed>
      <S.Header>Feed</S.Header>
      <S.FeedContents>
        {goals.map((goal) => (
          <S.GoalAndInput key={goal.id}>
            <Chip
              label={goal.name}
              color={goal.color}
              icon={<BookClose />}
              onAdd={handleTaskCreate}
            ></Chip>
            <TaskList
              color={goal.color}
              tasks={goalTasks[goal.id]}
              onTaskDelete={handleTaskDelete}
            ></TaskList>
          </S.GoalAndInput>
        ))}
      </S.FeedContents>
    </S.Feed>
  );
};
