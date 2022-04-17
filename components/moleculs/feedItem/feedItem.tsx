import {useSession} from "next-auth/react"
import React,{useCallback, useState,useMemo} from "react";
import {useSelector} from "react-redux";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {IconHeart} from "components/moleculs/iconHeartBeat";
import {useDataSaga, DataActionType,TaskData,GoalData} from "stores/data";
import {ComplimentData} from "stores/data/types"
import {RootState} from "stores/reducers"
import {Dayjs} from "utils/dayjs"

type FeedItemProps = {
  task: TaskData,
  goal: GoalData
}

export const FeedItem = ({task, goal}: FeedItemProps) => {
  const loggedInUserId = useSelector((state:RootState)=>state.navigation.loggedInUserId)
  const {status} = useSession()  
  const {fetch:getPublicTasksFetch} = useDataSaga<DataActionType.GET_PUBLIC_TASKS>(DataActionType.GET_PUBLIC_TASKS)
  const onSucceed = useCallback(()=>{
    getPublicTasksFetch({
      startTime: new Date("1999-11-11"),
      endTime: new Date("2222-11-11"),
    })
  },[getPublicTasksFetch])
  const {fetch:createComplimentFetch} = useDataSaga<DataActionType.CREATE_COMPLIMENT>(DataActionType.CREATE_COMPLIMENT, {additionalKeys: [task.id],onSucceed})
  const {fetch: deleteComplimentFetch} = useDataSaga<DataActionType.DELETE_COMPLIMENT>(DataActionType.DELETE_COMPLIMENT,{onSucceed})

  const [isClicked, setIsClicked] = useState(false);
  const [clickedEmoji, setClickedEmoji] = useState<ComplimentData["type"]>("red-heart");

  const complimented = useMemo(()=>{
    return task.compliments.find(compliment => compliment.author === loggedInUserId);
  },[loggedInUserId,task.compliments])


  const handleDelete = useCallback(()=>{
    if(!complimented) return;

    deleteComplimentFetch({
      pathSegments: [complimented.id]
    })
  },[deleteComplimentFetch,complimented])

  const handleClickedEmoji = useCallback((emoji:ComplimentData["type"])=>{
    if(status==="unauthenticated") {
      alert("로그인하시면 칭찬을 표현할 수 있어요!")
      return;
    }

    if(complimented) {
      handleDelete();
      if(complimented.type === emoji) return;
    }

    setIsClicked(true)
    setClickedEmoji(emoji);
    createComplimentFetch({
      data: {
        task: task.id,
        type: emoji,
      }
    })
  },[createComplimentFetch,handleDelete,task.id,status,complimented])  

  return (<>
    <li>
      <S.Item onDoubleClick={()=>handleClickedEmoji("red-heart")}>
        <S.Goal><Chip label={goal.name} color={goal.color}></Chip></S.Goal>
        <S.Task>{task.title}</S.Task>
        <S.Info>
          <S.ReactionList>
            <S.Reaction 
              onClick={()=>handleClickedEmoji("thumbs-up")} 
              complimented={complimented?.type==="thumbs-up"}>
              {"👍🏻"}
            </S.Reaction>
            <S.Reaction 
              onClick={()=>handleClickedEmoji("clapping-hands")} 
              complimented={complimented?.type==="clapping-hands"}>
              {"👏🏻"}
            </S.Reaction>
            <S.Reaction 
              onClick={()=>handleClickedEmoji("party-popper")} 
              complimented={complimented?.type==="party-popper"}>
              {"🎉"}
            </S.Reaction>
            <S.Reaction 
              onClick={()=>handleClickedEmoji("red-heart")} 
              complimented={complimented?.type==="red-heart"}>
              {"❤️"}
            </S.Reaction>
            <S.Count>{task.compliments.length}</S.Count>
          </S.ReactionList>
          <S.Li>{Dayjs(task.createdAt).format("MM/DD HH:mm")}</S.Li>
        </S.Info>
      </S.Item>
    </li>
    {isClicked && <IconHeart
      isVisible={isClicked}
      emoji={clickedEmoji}
      onHide={()=>setIsClicked(false)}></IconHeart>}
  </>);
};
