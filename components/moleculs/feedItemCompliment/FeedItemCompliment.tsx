import React,{useCallback, useState,useMemo} from "react";
import {ComplimentData,ComplimentType} from "api"
import {ComplimentButton} from "components/atoms/complimentButton";
import {SnackbarProps} from "components/atoms/snackbar";
import {ComplimentsCounter} from "components/moleculs/complimentsCounter";
import * as S from "components/moleculs/feedItem/feedItem.styled";
import {useSnackbarifyState} from "utils/snackbarify"

const ComplimentTypes:ComplimentType[] = ["clapping-hands","party-popper","red-heart","thumbs-up"]

type FeedItemComplimentProps = {
  compliments: ComplimentData[],
  loggedInUserId:string | null,
  onComplimentCreate: (emoji: ComplimentType)=>void,
  onComplimentDelete: (complimentId:string)=>void,
}

export const FeedItemCompliment = ({
  compliments, 
  loggedInUserId,
  onComplimentCreate,
  onComplimentDelete
}:FeedItemComplimentProps) => {  
  const clicked = useMemo(()=>{
    return compliments.find(compliment => compliment.author === loggedInUserId);
  },[compliments,loggedInUserId])
  const [clickedComplimentType, setClickedComplimentType] = useState(clicked?.type);
  const [complimentsCount, setComplimentsCount] = useState(compliments.length);

  const {setIsSnackbarVisible,setSnackbarProps} = useSnackbarifyState();
  const handleSnackbarShow = useCallback(()=>{
    const newProps:SnackbarProps = {
      message: "로그인 후 칭찬할 수 있어요!",
      type:"information",
    };
    setSnackbarProps(newProps);
    setIsSnackbarVisible(true)
  },[setIsSnackbarVisible,setSnackbarProps])

  const handleDelete = useCallback(()=>{
    if(clicked){
      setClickedComplimentType(undefined);
      onComplimentDelete(clicked?._id);
    }
  },[clicked,onComplimentDelete])

  const handleCreate = useCallback((emoji:ComplimentData["type"])=>{
    setClickedComplimentType(emoji);
    onComplimentCreate(emoji);
  },[onComplimentCreate])

  const handleClickedEmoji = useCallback((emoji:ComplimentData["type"])=>{
    if(!loggedInUserId) {
      handleSnackbarShow();
      return;
    }
    
    if(clickedComplimentType === undefined){
      setComplimentsCount((state)=>state+1);
      handleCreate(emoji);
    }else if(clickedComplimentType !== emoji){
      handleDelete();
      handleCreate(emoji);
    }else{
      setComplimentsCount((state)=>state-1);
      handleDelete();
    }
    
  },[clickedComplimentType,handleSnackbarShow,loggedInUserId,handleDelete,handleCreate])  

  return (
    <S.ComplimentList>
      {ComplimentTypes.map((type)=>(
        <ComplimentButton 
          key={type}
          type={type}
          clicked={clickedComplimentType ? clickedComplimentType===type : false}
          onClick={handleClickedEmoji}></ComplimentButton>
      ))}
      <ComplimentsCounter complimentsCount={complimentsCount}></ComplimentsCounter>
    </S.ComplimentList>
  )
}