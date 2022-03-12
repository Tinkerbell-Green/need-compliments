import React, {useState, useEffect, useCallback} from "react";
import * as S from "./feed.styled";
import {Tasks} from "./tasks";
import {Chip} from "components/chip";
import {ExpandedGoalData} from "pages";
import {
  useDataSaga,
  DataActionType,
  DataSagaStatus,
  TaskData,
} from "stores/data";

type FeedProps = {
	goals: ExpandedGoalData[];
};

export const Feed = ({goals}: FeedProps) => {
  const {
    fetch: getTasksByDaysFetch,
    data: getTasksByDaysData,
    refetch: getTasksByDaysRefetch,
  } = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(
    DataActionType.GET_TASKS_BY_DAYS
  );
  const {fetch: createTaskFetch, status: createTaskStatus} = useDataSaga<DataActionType.CREATE_TASK>(DataActionType.CREATE_TASK);
  const {fetch: deleteTaskFetch, status: deleteTaskStatus} =
		useDataSaga<DataActionType.DELETE_TASK>(DataActionType.DELETE_TASK);
  
  const [tasks, setTasks] = useState<TaskData[]>();

  useEffect(() => {
    getTasksByDaysFetch({
      startDay: new Date("1999-11-11"),
      endDay: new Date("2222-11-11"),
    });
  }, [getTasksByDaysFetch]);

  useEffect(() => {
    setTasks(getTasksByDaysData || []);
  }, [getTasksByDaysData]);

  const handleCreateTask = useCallback(
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

  const handleDelete = useCallback((id: string)=>{
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

  return (
    <S.Feed>
      <S.Header>Feed</S.Header>
      <S.FeedContents>
        {goals.map((goal) => (
          <S.GoalAndInput key={goal.id}>
            <Chip
              label={goal.name}
              color={goal.color}
              icon={<S.GrayIcon />}
              onAdd={handleCreateTask}
            ></Chip>
            <Tasks
              color={goal.color}
              tasks={tasks?.filter((task) => task.goal === goal.name) || []}
              onDeleteTask={handleDelete}
            ></Tasks>
          </S.GoalAndInput>
        ))}
      </S.FeedContents>
    </S.Feed>
  );
};
