import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import React, {useMemo} from "react";
import * as S from "./feed.styled";
import {TaskList} from "./task-list";
import {Chip} from "components/atoms/chip";
import {ReducedGoalData} from "pages";
import {TaskData, GoalData} from "stores/data";

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
  return (
    <S.Feed>
      <S.Header>Feed
        <S.PickedDate>{pickedDate}</S.PickedDate>
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
