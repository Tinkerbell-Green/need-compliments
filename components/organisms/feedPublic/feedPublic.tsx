import React,{useCallback, useState} from "react";
import {GetTasksData,ComplimentType} from "api"
import {FeedItem} from "components/moleculs/feedItem"
import {IconHeart} from "components/moleculs/iconHeartBeat";

type FeedPublicProps = {
  tasks: GetTasksData["tasks"];
  loggedInUserId:string | null,
  onComplimentCreate: (emoji: ComplimentType, taskId:string)=>void,
  onComplimentDelete: (complimentId:string)=>void,
};

export const FeedPublic = ({
  tasks,
  loggedInUserId,
  onComplimentCreate,
  onComplimentDelete
}: FeedPublicProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleAnimationHide = useCallback(()=>setIsClicked(false),[setIsClicked]);
  const handleAnimationShow = useCallback(()=>setIsClicked(true),[setIsClicked]);
  return (
    <>
      <ul>
        {(tasks || []).map(item => (
          <FeedItem 
            key={item._id} 
            task={item} 
            goal={item.goalData}
            loggedInUserId={loggedInUserId}
            onComplimentCreate={onComplimentCreate}
            onComplimentDelete={onComplimentDelete}
            onAnimationShow={handleAnimationShow}
          ></FeedItem>
        ))}
      </ul>
      {isClicked && <IconHeart
        isVisible={isClicked}
        onHide={handleAnimationHide}></IconHeart>}
    </>
  );
};
