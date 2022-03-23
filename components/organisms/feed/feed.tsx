import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import React,{useMemo} from "react";
import * as S from "./feed.styled";
import {TaskList} from "./task-list";
import {Chip} from "components/atoms/chip";
import {TaskData,GoalData} from "stores/data";
import {Dayjs} from "utils/dayjs";

type FeedProps = {
  pickedDate:string,
  goalTasks: Record<string, TaskData[]>,
	goals: GoalData[],
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
  const isAddable = useMemo(()=>Dayjs(pickedDate,"DDMMYYYY").toNow().match(/전/g),[pickedDate]);

  return (
    <S.Feed>
      <S.Header>
        <S.PickedDate>{`${pickedDate.substring(4)}년 ${pickedDate.substring(2,4)}월 ${pickedDate.substring(0,2)}일`}</S.PickedDate>
      </S.Header>
      <S.FeedContents>
        {isAddable
          ? goals.map((goal) => (
            <S.GoalAndInput key={goal.id}>
              <Chip
                label={goal.name}
                color={goal.color}
                icon={<BookClose />}
              ></Chip>
            </S.GoalAndInput>))
          : goals.map((goal) => (
            <S.GoalAndInput key={goal.id}>
              <Chip
                label={goal.name}
                color={goal.color}
                icon={<BookClose />}
                onAdd={()=>onTaskCreate(goal.id)}
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
