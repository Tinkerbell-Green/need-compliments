import {useSession} from "next-auth/react"
import React,{useCallback, useState,useMemo, useRef, memo} from "react";
import {useSelector} from "react-redux";
import * as S from "./feedItem.styled";
import {TaskData} from "api"
import {ComplimentData, GoalData,ComplimentType} from "api"
import {SnackbarProps} from "components/atoms/snackbar";
import {FeedItemGoal} from "components/moleculs/feedItemGoal";
import {FeedItemReactionList} from "components/moleculs/feedItemReactionList";
import {FeedItemTask} from "components/moleculs/feedItemTask";
import {FeedItemTime} from "components/moleculs/feedItemTime";
import {useSnackbarifyState} from "utils/snackbarify"

type FeedItemProps = {
  task: TaskData,
  goal?: GoalData,
  loggedInUserId:string | null,
  onComplimentCreate: (emoji: ComplimentType, taskId:string)=>void,
  onComplimentDelete: (complimentId:string)=>void,
  onAnimationShow:()=>void
}

const FeedItem = ({
  task,
  goal,
  loggedInUserId,
  onComplimentCreate,
  onComplimentDelete,
  onAnimationShow}: FeedItemProps) => {
  const {setIsSnackbarVisible,setSnackbarProps} = useSnackbarifyState();

  const clicked = useMemo(()=>{
    return task.compliments.find(compliment => compliment.author === loggedInUserId);
  },[task.compliments,loggedInUserId])

  const handleSnackbarShow = useCallback(()=>{
    setIsSnackbarVisible(true)
  },[setIsSnackbarVisible])

  const handleClickedEmoji = useCallback((emoji:ComplimentData["type"])=>{
    if(!loggedInUserId) {
      const newProps:SnackbarProps = {
        message: `로그인 후 "${task.title}" 를 칭찬할 수 있습니다.`,
        type:"information",
      };
      setSnackbarProps(newProps);
      handleSnackbarShow();
      return;
    }

    if(clicked) {
      onComplimentDelete(clicked._id);
      if(clicked.type === emoji) return;
    }

    onAnimationShow()
    onComplimentCreate(emoji,task._id);
    
  },[onComplimentDelete,task,clicked,setSnackbarProps,handleSnackbarShow,onComplimentCreate,loggedInUserId,onAnimationShow])  

  return (<>
    <li>
      <S.Item>
        <FeedItemGoal label={goal?.name || ""} color={goal?.color || "white"}></FeedItemGoal>
        <FeedItemTask title={task.title}></FeedItemTask>
        <S.Info>
          <FeedItemReactionList
            onEmojiClick={handleClickedEmoji}  
            complimentsNumber={task.compliments.length}
            clickedType={clicked ? clicked.type : null}
          ></FeedItemReactionList>
          <FeedItemTime time={task.createdAt}></FeedItemTime>
        </S.Info>
      </S.Item>
    </li>
  </>);
};

FeedItem.displayName="FeedItem"

const areEqual = (prevProps:FeedItemProps,nextProps:FeedItemProps)=>{
  if(prevProps.loggedInUserId !== nextProps.loggedInUserId) return false;

  const {loggedInUserId}=nextProps;
  if(prevProps.task.compliments.find(compliment => compliment.author === loggedInUserId)?.type === nextProps.task.compliments.find(compliment => compliment.author === loggedInUserId)?.type){
    return true;
  }
  return false;
}

export default memo(FeedItem,areEqual)