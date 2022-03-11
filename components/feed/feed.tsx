import {Book as BookOpen,BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose,BookDead} from "@styled-icons/fa-solid";
import React,{useState} from "react";
import * as S from "./feed.styled";
import {Tasks} from "./tasks"
import {Chip} from "components/chip";
import {ExpandedGoalData} from "pages";

type FeedProps = {
  goals: ExpandedGoalData[];
}

export type TaskData = {
  id:string,
  title:string
}

export const Feed = ({
  goals,
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
        {goals.map((value)=>(
          <S.GoalAndInput key={value.id}> 
            {/* TODO: key library 도입?  */}
            <Chip
              label={value.name}
              color={value.color}
              icon={<BookOpen/>}
              onAdd={handleAddTask}
            >
            </Chip>
            <Tasks color={value.color} tasks={tasks}></Tasks>
          </S.GoalAndInput>
        ))}
        
        
      </S.FeedContents>
    </S.Feed>
  )
}