import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import React,{useMemo} from "react";
import * as S from "./feedPersonal.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon"
import {TaskInput} from "components/moleculs/taskInput"
import {TaskData,GoalData} from "stores/data";
import {Dayjs} from "utils/dayjs";

type FeedPersonalProps = {
  pickedDate:string,
  goalTasks: Record<string, TaskData[]>,
	goals: GoalData[],
  onTaskDelete: (id:string)=>void,
  onTaskCreate: (id:string, readPermission: GoalData["readPermission"])=>void,
  onTaskUpdate:(id:string, text:string)=>void,
};

export const FeedPersonal = ({
  pickedDate,
  goalTasks,
  goals,
  onTaskDelete,
  onTaskCreate,
  onTaskUpdate
}: FeedPersonalProps) => {
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
                icon={<Icon size={18} color="gray" aria-label={"personal image"}><BookClose /></Icon>}
              ></Chip>
            </S.GoalAndInput>))
          : goals.map((goal) => (
            <S.GoalAndInput key={goal.id}>
              <Chip
                label={goal.name}
                color={goal.color}
                icon={<Icon size={18}  color="gray" aria-label={"personal image"}><BookClose /></Icon>}
                onAdd={()=>onTaskCreate(goal.id, goal.readPermission)}
              ></Chip>
              <ul>
                {goalTasks[goal.id].map(({id,title})=>(
                  <TaskInput 
                    key={id} 
                    id={id} 
                    color={goal.color} 
                    title={title} 
                    onTaskDelete={onTaskDelete}
                    onTaskUpdate={onTaskUpdate}></TaskInput>
                ))}
              </ul>
            </S.GoalAndInput>
          ))}
      </S.FeedContents>
    </S.Feed>
  );
};
