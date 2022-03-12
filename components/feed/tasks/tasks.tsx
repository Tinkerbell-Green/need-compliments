import React from "react";
import {Task} from "./task"
import * as S from "./tasks.styled";
import {TaskData} from "stores/data";

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
        <Task key={id} id={id} color={color} title={title}></Task>
      ))}
    </S.ListContainer>
  )
}