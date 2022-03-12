import React from "react";
import {Task} from "./task"
import * as S from "./tasks.styled";
import {TaskData} from "stores/data";

type TasksProps = {
  color:string,
  tasks:TaskData[],
  onDeleteTask : (valud:string)=>void;
}

export const Tasks = ({
  color,
  tasks,
  onDeleteTask,
}: TasksProps) => {
  return (
    <S.ListContainer>
      {tasks.map(({id,title})=>(
        <Task 
          key={id} 
          id={id} 
          color={color} 
          title={title} 
          onDeleteTask={onDeleteTask}></Task>
      ))}
    </S.ListContainer>
  )
}