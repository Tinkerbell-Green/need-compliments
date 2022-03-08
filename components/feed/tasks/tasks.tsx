import React from "react";
import {TaskData} from "../feed";
import {Task} from "./task";
import * as S from "./tasks.styled";

type TasksProps = {
  color:string,
  tasks:TaskData[]
}

export const Tasks = ({
  color,
  tasks,
}: TasksProps) => {
  return (
    <S.ListContainer>
      {tasks.map(({id,title})=>(
        <Task key={id} color={color} title={title}></Task>
      ))}
    </S.ListContainer>
  )
}