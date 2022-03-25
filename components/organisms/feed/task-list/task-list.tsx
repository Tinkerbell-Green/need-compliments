import React from "react";
import {Task} from "./task"
import {TaskData} from "stores/data";
import {GoalColor} from "stores/data/types";

type TaskListProps = {
  color:GoalColor,
  tasks:TaskData[],
  onTaskDelete : (value:string)=>void;
  onTaskUpdate: (id: string, text:string) => void;
}

export const TaskList = ({
  color,
  tasks,
  onTaskDelete,
  onTaskUpdate,
}: TaskListProps) => {
  return (
    <ul>
      {tasks.map(({id,title})=>(
        <Task 
          key={id} 
          id={id} 
          color={color} 
          title={title} 
          onTaskDelete={onTaskDelete}
          onTaskUpdate={onTaskUpdate}></Task>
      ))}
    </ul>
  )
}