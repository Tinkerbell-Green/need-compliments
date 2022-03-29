import {HandThumbsUpFill} from "@styled-icons/bootstrap";
import React,{useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon";
import {IconThumbsUp} from "components/moleculs/iconThumbsUp";
import {GoalData, TaskData} from "stores/data";
import {Dayjs} from "utils/dayjs"
/*
<div onClick={()=>{
            setIsThumbsClick(true);
            setTimeout(()=>setIsThumbsClick(false),2000);
          }}>
*/

type FeedItemProps = {
  task: TaskData,
  goal: GoalData
}

export const FeedItem = ({task, goal}: FeedItemProps) => {
  const [isThumbsClick, setIsThumbsClick] = useState(false);

  return (
    <li>
      <S.Item>
        <S.Goal><Chip label={goal.name} color={goal.color}></Chip></S.Goal>
        <S.Task>{task.title}</S.Task>
        <S.ReactionList>
          <S.Reaction>{"👍🏻"}</S.Reaction>
          <S.Reaction>{"👏🏻"}</S.Reaction>
          <S.Reaction>{"🎉"}</S.Reaction>
          <S.Reaction>{"❤️"}</S.Reaction>
          {/* <IconThumbsUp clicked={isThumbsClick}></IconThumbsUp> */}
          {/* <Icon><HeartFill/></Icon> */}
          {/* <Icon><Celebration/></Icon> */}
        </S.ReactionList>
        {/* <S.Count>{task.compliments.length}</S.Count> */}
        {/* <S.Li>{task.author}</S.Li> */}
        <S.Li>{Dayjs(task.doneAt).format("MM/DD HH:mm")}</S.Li>
        
      </S.Item>
    </li>
  );
};
