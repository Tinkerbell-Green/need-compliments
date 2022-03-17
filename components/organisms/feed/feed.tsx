import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import React, {useMemo} from "react";
import * as S from "./feed.styled";
import {TaskList} from "./task-list";
import {Chip} from "components/atoms/chip";
import {ReducedGoalData} from "pages";
import {TaskData, GoalData} from "stores/data";
import {Dayjs} from "utils/dayjs";

type FeedProps = {
  pickedDate?:string,
  goalTasks: Record<string, TaskData[]>,
	goals: ReducedGoalData[],
  onTaskDelete: (id:string)=>void,
  onTaskCreate: (id:string)=>void,
  onTaskUpdate:(id:string, text:string)=>void,
};

export const Feed = ({
  pickedDate,
  goalTasks,
  goals,
  onTaskDelete,
  onTaskCreate,
  onTaskUpdate
}: FeedProps) => {
  const formatedDate = useMemo(()=>{
    const year = pickedDate?.slice(4);
    const month =  pickedDate?.slice(2,4)
    const date = pickedDate?.slice(0,2);

    return `${year}년 ${month}월 ${date}일`;
  },[pickedDate]);

  return (
    <S.Feed>
      <S.Header>Feed
        <S.PickedDate>{formatedDate}</S.PickedDate>
      </S.Header>
      <S.FeedContents>
        {goals.map((goal) => (
          <S.GoalAndInput key={goal.id}>
            <Chip
              id={goal.id}
              label={goal.name}
              color={goal.color}
              icon={<BookClose />}
              onAdd={onTaskCreate}
            ></Chip>
            <TaskList
              color={goal.color}
              tasks={goalTasks[goal.id]}
              onTaskDelete={onTaskDelete}
              onTaskUpdate={onTaskUpdate}
            ></TaskList>
          </S.GoalAndInput>
        ))}
      </S.FeedContents>
    </S.Feed>
  );
};
