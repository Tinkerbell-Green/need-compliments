import {HandThumbsUpFill,HeartFill,} from "@styled-icons/bootstrap";
import {Celebration} from "@styled-icons/material-rounded/";
import React,{useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon";
import {IconThumbsUp} from "components/moleculs/iconThumbsUp";
import {GoalData, TaskData} from "stores/data";
import {Dayjs} from "utils/dayjs"
/*
@styled-icons/bootstrap/EmojiHeartEyesFill
@styled-icons/bootstrap/HeartFill
@styled-icons/fa-solid/KissWinkHeart
import {HandThumbsUpFill} from "@styled-icons/bootstrap";

*/

type FeedItemProps = {
  task?: TaskData,
  goal?: GoalData
}

export const FeedItem = ({
  task={
    id:"task0", 
    title:"개발개발", 
    author:"홍빈이",
    goal:"goal0",
    compliments:[],
    doneAt:new Date().getTime(),
    createdAt:new Date().getTime(),
    updatedAt:new Date().getTime(),
    readPermission:"everyone"},
  goal={
    id:"goal0",
    name:"개발왕",
    color:"mediunslateblue",
    author:"홍빈이",
    createdAt:new Date().getTime(),
    updatedAt:new Date().getTime(),
    readPermission:"everyone"
  }
}: FeedItemProps) => {
  const [isThumbsClick, setIsThumbsClick] = useState(false);

  return (
    <li>
      <S.Item>
        <Chip label={goal.name} color={goal.color}></Chip>
        <S.Task>{task.title}</S.Task>
        <div>
          <div onClick={()=>{
            setIsThumbsClick(true);
            setTimeout(()=>setIsThumbsClick(false),2000);
          }}>
            <S.ReactionList>
              <S.Reaction>{"👍🏻"}</S.Reaction>
              <S.Reaction>{"👏🏻"}</S.Reaction>
              <S.Reaction>{"🎉"}</S.Reaction>
              <S.Reaction>{"❤️"}</S.Reaction>
              {/* <IconThumbsUp clicked={isThumbsClick}></IconThumbsUp> */}
              {/* <Icon><HeartFill/></Icon> */}
              {/* <Icon><Celebration/></Icon> */}
            </S.ReactionList>
            <S.Count>{task.compliments.length}</S.Count>
          </div>
          <S.Li>{task.author}</S.Li>
          <S.Li>{Dayjs(task.doneAt).format("MM/DD HH:mm")}</S.Li>
        </div>
      </S.Item>
    </li>
  );
};
