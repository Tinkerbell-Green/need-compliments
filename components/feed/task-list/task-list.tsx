import React from "react";
import {Task} from "./task"
import {TaskData} from "stores/data";

type TaskListProps = {
  color:string,
  tasks:TaskData[],
  onTaskDelete : (value:string)=>void;
}

export const TaskList = ({
  color,
  tasks,
  onTaskDelete,
}: TaskListProps) => {
  return (
    <li>
      {tasks.map(({id,title})=>(
        <Task 
          key={id} 
          id={id} 
          color={color} 
          title={title} 
          onTaskDelete={onTaskDelete}></Task>
      ))}
    </li>
  )
}