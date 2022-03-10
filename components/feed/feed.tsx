import {Book as BookOpen,BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose,BookDead} from "@styled-icons/fa-solid";
import React,{useState} from "react";
import * as S from "./feed.styled";
import {Tasks} from "./tasks"
import {Chip} from "components/chip";

type FeedProps = {
  goals: string[];
  goalsColor: string[];
}

export type TaskData = {
  id:string,
  title:string
}

export const Feed = ({
  goals,
  goalsColor
}:FeedProps) => {
  const [tasks, setTasks] = useState([{
    id:Date.now().toString(),
    title: "Leetcode 4 solved!",
  }]);

  const handleAddTask = ()=> { 
    //TODO: Tasks에 새로운 Task를 추가한다.
    tasks.push({
      id:Date.now().toString(),
      title:"",
    })
    setTasks([...tasks]);
  }

  return (
    <S.Feed>
      <S.Header>Feed</S.Header>
      <S.FeedContents>
        {goals.map((value,index)=>(
          <S.GoalAndInput key={index}> 
            {/* TODO: key library 도입?  */}
            <Chip
              key={index}
              label={value}
              color={goalsColor[index]}
              icon={<BookOpen/>}
              onAdd={handleAddTask}
            >
            </Chip>
            <Tasks key={Date.now()} color={goalsColor[index]} tasks={tasks}></Tasks>
          </S.GoalAndInput>
        ))}
        
        
      </S.FeedContents>
    </S.Feed>
  )
}