import React,{useState} from "react";
import * as S from "./feedItem.styled";
import {Chip} from "components/atoms/chip";
import {IconThumbsUp} from "components/moleculs/iconThumbsUp";
import {GoalColor} from "stores/data";
// TODO: dayjs('2019-01-25').format('MM/DD HH:mm')
type FeedItemProps = {
  goal? : string,
  goalColor?: GoalColor,
  task?: string,
  complimentsCount?: number,
  writer?: string,
  doneAt?: string,
};

export const FeedItem = ({
  goal="개발왕",
  goalColor="mediunslateblue",
  task="칭필을 개발개발",
  complimentsCount=17,
  writer="홍빈이",
  doneAt="03/27 16:21",
}: FeedItemProps) => {
  const [isThumbsClick, setIsThumbsClick] = useState(false);

  return (
    <li>
      <S.Item>
        <Chip label={goal} color={goalColor}></Chip>
        <S.Task>{task}</S.Task>
        <div>
          <S.Reaction onClick={()=>{
            setIsThumbsClick(true);
            setTimeout(()=>setIsThumbsClick(false),2000);
          }}>
            <IconThumbsUp clicked={isThumbsClick}></IconThumbsUp>
            <S.Count>{complimentsCount}</S.Count>
          </S.Reaction>
          <S.Li>{writer}</S.Li>
          <S.Li>{doneAt}</S.Li>
        </div>
      </S.Item>
    </li>
  );
};
