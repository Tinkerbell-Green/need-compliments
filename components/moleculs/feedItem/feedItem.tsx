import React,{useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon";
import {IconHeart} from "components/moleculs/iconHeart";
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
  const [isClicked, setIsClicked] = useState(false);

  return (<>
    <li>
      <S.Item onDoubleClick={()=>setIsClicked(true)}>
        <S.Goal><Chip label={goal.name} color={goal.color}></Chip></S.Goal>
        <S.Task>{task.title}</S.Task>
        <S.ReactionList>
          <S.Reaction onClick={()=>setIsClicked(true)}>{"👍🏻"}</S.Reaction>
          <S.Reaction onClick={()=>setIsClicked(true)}>{"👏🏻"}</S.Reaction>
          <S.Reaction onClick={()=>setIsClicked(true)}>{"🎉"}</S.Reaction>
          <S.Reaction onClick={()=>setIsClicked(true)}>{"❤️"}</S.Reaction>
          {/* <IconThumbsUp clicked={isClicked}></IconThumbsUp> */}
        </S.ReactionList>
        {/* <S.Count>{task.compliments.length}</S.Count> */}
        {/* <S.Li>{task.author}</S.Li> */}
        <S.Li>{Dayjs(task.createdAt).format("MM/DD HH:mm")}</S.Li>
      </S.Item>
    </li>
    <IconHeart isVisible={isClicked} onHide={()=>setIsClicked(false)}></IconHeart>
  </>);
};
