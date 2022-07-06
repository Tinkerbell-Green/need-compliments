import React,{useCallback, memo} from "react";
import * as S from "./feedItem.styled";
import {TaskData} from "api"
import {ComplimentData, GoalData,ComplimentType} from "api"
import {FeedItemCompliment} from "components/moleculs/feedItemCompliment";
import {FeedItemGoal} from "components/moleculs/feedItemGoal";
import {FeedItemTask} from "components/moleculs/feedItemTask";
import {FeedItemTime} from "components/moleculs/feedItemTime";

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
  onAnimationShow
}: FeedItemProps) => {
  const handleComplimentCreate = useCallback((emoji:ComplimentData["type"])=>{
    onAnimationShow();
    onComplimentCreate(emoji,task._id);
  },[onAnimationShow,task._id,onComplimentCreate])

  return (<>
    <li>
      <S.Item>
        {goal && <FeedItemGoal goal={goal}></FeedItemGoal>}
        <FeedItemTask task={task}></FeedItemTask>
        <S.Info>
          <FeedItemCompliment
            compliments={task.compliments}
            loggedInUserId={loggedInUserId}
            onComplimentCreate={handleComplimentCreate}
            onComplimentDelete={onComplimentDelete}
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