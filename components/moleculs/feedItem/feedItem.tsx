import React,{useCallback, useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon";
import {IconHeart} from "components/moleculs/iconHeartBeat";
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
  const [clickedEmoji, setClickedEmoji] = useState("❤️");

  const handleClickedEmoji = useCallback((emoji:string)=>{
    setIsClicked(true)
    setClickedEmoji(emoji);
  },[])  

  return (<>
    <li>
      <S.Item onDoubleClick={()=>handleClickedEmoji("❤️")}>
        <S.Goal><Chip label={goal.name} color={goal.color}></Chip></S.Goal>
        <S.Task>{task.title}</S.Task>
        <S.Info>
          <S.ReactionList>
            <S.Reaction onClick={()=>handleClickedEmoji("👍🏻")}>{"👍🏻"}</S.Reaction>
            <S.Reaction onClick={()=>handleClickedEmoji("👏🏻")}>{"👏🏻"}</S.Reaction>
            <S.Reaction onClick={()=>handleClickedEmoji("🎉")}>{"🎉"}</S.Reaction>
            <S.Reaction onClick={()=>handleClickedEmoji("❤️")}>{"❤️"}</S.Reaction>
            <S.Count>{task.compliments.length}</S.Count>
            {/* <IconThumbsUp clicked={isClicked}></IconThumbsUp> */}
          </S.ReactionList>
          {/* <S.Li>{task.author}</S.Li> */}
          
          <S.Li>{Dayjs(task.createdAt).format("MM/DD HH:mm")}</S.Li>
        </S.Info>
      </S.Item>
    </li>
    <IconHeart 
      isVisible={isClicked}
      emoji={clickedEmoji}
      onHide={()=>setIsClicked(false)}></IconHeart>
  </>);
};
