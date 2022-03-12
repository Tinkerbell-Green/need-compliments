import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
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
  const {fetch: createTaskFetch, status: createTaskStatus} = useDataSaga<DataActionType.CREATE_TASK>(DataActionType.CREATE_TASK)
  
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

  useEffect(()=>{
    if (createTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, createTaskStatus])

  return (
    <S.Feed>
      <S.Header>Feed</S.Header>
      <S.FeedContents>
        {goals.map((goal) => (
          <S.GoalAndInput key={goal.id}>
            <Chip
              label={goal.name}
              color={goal.color}
              icon={<BookOpen />}
              onAdd={()=>handleCreateTask(goal.name)}
            ></Chip>
            <Tasks
              color={goal.color}
              tasks={tasks?.filter((task) => task.title === goal.name) || []}
            ></Tasks>
          </S.GoalAndInput>
        ))}
      </S.FeedContents>
    </S.Feed>
  );
};
