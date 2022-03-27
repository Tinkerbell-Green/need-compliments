import React,{useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {IconThumbsUp} from "components/moleculs/iconThumbsUp";
import {GoalData, TaskData} from "stores/data";
import {Dayjs} from "utils/dayjs"

type FeedItemProps = {
  task: TaskData,
  goal: GoalData
}

export const FeedItem = ({
  task,
  goal,
}: FeedItemProps) => {
  const [isThumbsClick, setIsThumbsClick] = useState(false);

  return (
    <li>
      <S.Item>
        <Chip label={goal.name} color={goal.color}></Chip>
        <S.Task>{task.title}</S.Task>
        <div>
          <S.Reaction onClick={()=>{
            setIsThumbsClick(true);
            setTimeout(()=>setIsThumbsClick(false),2000);
          }}>
            <IconThumbsUp clicked={isThumbsClick}></IconThumbsUp>
            <S.Count>{task.compliments.length}</S.Count>
          </S.Reaction>
          <S.Li>{task.author}</S.Li>
          <S.Li>{Dayjs(task.doneAt).format("MM/DD HH:mm")}</S.Li>
        </div>
      </S.Item>
    </li>
  );
};
