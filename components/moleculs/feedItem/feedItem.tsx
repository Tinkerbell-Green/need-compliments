import {useSession} from "next-auth/react"
import React,{useCallback, useState,useMemo, useRef, memo} from "react";
import {useSelector} from "react-redux";
import * as S from "./feedItem.styled";
import {TaskData} from "api"
import {ComplimentData, GoalData,ComplimentType} from "api"
import {SnackbarProps} from "components/atoms/snackbar";
import {FeedItemCompliment} from "components/moleculs/feedItemCompliment";
import {FeedItemGoal} from "components/moleculs/feedItemGoal";
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
  const [clickedReactionType, setClickedReactionType] = useState(clicked?.type);

  const handleComplimentDelete = useCallback(()=>{
    if(clicked) {
      setClickedReactionType(undefined)
      onComplimentDelete(clicked._id);
    }
  },[clicked,onComplimentDelete])

  const handleComplimentCreate = useCallback((emoji:ComplimentData["type"])=>{
    onAnimationShow();
    setClickedReactionType(emoji)
    onComplimentCreate(emoji,task._id);
  },[onAnimationShow,task._id,onComplimentCreate])

  const handleSnackbarShow = useCallback(()=>{
    const newProps:SnackbarProps = {
      message: `로그인 후 "${task.title}" 를 칭찬할 수 있습니다.`,
      type:"information",
    };
    setSnackbarProps(newProps);
    setIsSnackbarVisible(true)
  },[setIsSnackbarVisible,setSnackbarProps,task.title])

  const handleClickedEmoji = useCallback((emoji:ComplimentData["type"])=>{
    if(!loggedInUserId) {
      handleSnackbarShow();
      return;
    }

    handleComplimentDelete();

    if(clickedReactionType !== emoji){
      handleComplimentCreate(emoji);
    }
    
  },[clickedReactionType,handleSnackbarShow,loggedInUserId,handleComplimentDelete,handleComplimentCreate])  

  return (<>
    <li>
      <S.Item>
        {goal && <FeedItemGoal goal={goal}></FeedItemGoal>}
        <FeedItemTask task={task}></FeedItemTask>
        <S.Info>
          <FeedItemCompliment
            compliments={task.compliments}
            onEmojiClick={handleClickedEmoji}  
            clickedType={clickedReactionType ? clickedReactionType : null}
          ></FeedItemCompliment>
          <FeedItemTime task={task}></FeedItemTime>
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