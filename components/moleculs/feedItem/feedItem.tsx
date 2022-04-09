import React,{useCallback, useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {IconHeart} from "components/moleculs/iconHeartBeat";
import {GoalData, TaskData} from "stores/data";
import {ComplimentData} from "stores/data/types"
import {Dayjs} from "utils/dayjs"

type FeedItemProps = {
  task: TaskData,
  goal: GoalData
}

export const FeedItem = ({task, goal}: FeedItemProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedEmoji, setClickedEmoji] = useState<ComplimentData["type"]>("red-heart");

  const handleClickedEmoji = useCallback((emoji:ComplimentData["type"])=>{
    setIsClicked(true)
    setClickedEmoji(emoji);
  },[])  

  return (<>
    <li>
      <S.Item onDoubleClick={()=>handleClickedEmoji("red-heart")}>
        <S.Goal><Chip label={goal.name} color={goal.color}></Chip></S.Goal>
        <S.Task>{task.title}</S.Task>
        <S.Info>
          <S.ReactionList>
            <S.Reaction onClick={()=>handleClickedEmoji("thumbs-up")}>{"👍🏻"}</S.Reaction>
            <S.Reaction onClick={()=>handleClickedEmoji("clapping-hands")}>{"👏🏻"}</S.Reaction>
            <S.Reaction onClick={()=>handleClickedEmoji("party-popper")}>{"🎉"}</S.Reaction>
            <S.Reaction onClick={()=>handleClickedEmoji("red-heart")}>{"❤️"}</S.Reaction>
            <S.Count>{task.compliments.length}</S.Count>
          </S.ReactionList>
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
