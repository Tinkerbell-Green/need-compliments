import {useSession} from "next-auth/react"
import React,{useCallback, useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {IconHeart} from "components/moleculs/iconHeartBeat";
import {useDataSaga, DataActionType,TaskData,GoalData, dataActionCreators, DataSagaStatus} from "stores/data";
import {ComplimentData} from "stores/data/types"
import {Dayjs} from "utils/dayjs"

type FeedItemProps = {
  task: TaskData,
  goal: GoalData
}

export const FeedItem = ({task, goal}: FeedItemProps) => {
  const {status} = useSession()  
  const {fetch:getPublicTasksFetch} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const onSucceed = useCallback(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])

  const {fetch:createComplimentFetch} = useDataSaga<DataActionType.CREATE_COMPLIMENT>(DataActionType.CREATE_COMPLIMENT, {additionalKeys: [task.id],onSucceed})
  const [isClicked, setIsClicked] = useState(false);
  const [clickedEmoji, setClickedEmoji] = useState<ComplimentData["type"]>("red-heart");

  const handleClickedEmoji = useCallback((emoji:ComplimentData["type"])=>{
    if(status==="unauthenticated") return;

    setIsClicked(true)
    setClickedEmoji(emoji);
    createComplimentFetch({
      data: {
        task: task.id,
        type: emoji,
      }
    })
  },[createComplimentFetch,task.id,status])  

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
    {isClicked && <IconHeart 
      key={Math.random()}
      isVisible={isClicked}
      emoji={clickedEmoji}
      color={goal.color}
      onHide={()=>setIsClicked(false)}></IconHeart>}
  </>);
};
