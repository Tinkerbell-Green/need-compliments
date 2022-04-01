import {PatchCheck} from "@styled-icons/bootstrap";
import {MoreHorizontalOutline} from "@styled-icons/evaicons-outline";
import React, {useCallback, useRef, useState} from "react";
import * as S from "./taskInput.styled";
import {ModalTaskAction} from "components/organisms/modalTaskAction";
import {GoalColor} from "stores/data/types";

type TaskInputProps = {
	id: string;
	color: GoalColor;
	title: string;
	onTaskDelete: (value: string) => void;
  onTaskUpdate: (id: string, text:string) => void;
};

export const TaskInput = ({
  id, 
  color, 
  title, 
  onTaskDelete,
  onTaskUpdate
}: TaskInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const InputRef = useRef<HTMLInputElement>(null);
  const [submitTimer, setSubmitTimer] = useState<NodeJS.Timeout>();

  const handleModalClose = useCallback(()=>setIsModalOpen(false),[])
  const handleModalOpen = useCallback(()=>setIsModalOpen(true),[])

  const deleteTask = useCallback((id)=>{
    onTaskDelete(id);
  },[onTaskDelete])

  const saveTask = useCallback((id,inputValue)=>{
    onTaskUpdate(id,inputValue);
  },[onTaskUpdate]);

  const handleSubmit = useCallback((event : React.FormEvent |  React.FocusEvent)=>{
    event.preventDefault();
    setIsEditing(false);
    
    if(!inputValue){
      if(!title) deleteTask(id);
      else if(confirm(`${title}을 삭제하시겠습니까?`)) deleteTask(id);
      return;
    }
    if(inputValue===title){
      return;
    }

    submitTimer && clearTimeout(submitTimer);

    const newTimer = setTimeout(()=>{
      saveTask(id,inputValue);
    },500);
    setSubmitTimer(newTimer);

  },[saveTask,deleteTask,id,inputValue,title,submitTimer])

  const handleChange:React.ChangeEventHandler = useCallback((e) => {
    const currentValue = InputRef.current?.value || "";
    setInputValue(currentValue);
  },[]);

  const changeEditFocus = useCallback(()=>{
    InputRef.current?.focus();
    setIsEditing(true);
  },[])

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          isUnderline={isEditing}
          color={color}
          autoFocus={title ? false : true}
          value={inputValue}
          placeholder="오늘 한 일로 스스로에게 칭찬해보세요 😀"
          type="text"
          ref={InputRef}
          onBlur={handleSubmit}
          onChange={handleChange}
          onFocus={changeEditFocus}
        ></S.Input>
        <S.Button type="submit" onClick={handleSubmit} aria-label={"저장하기"}><PatchCheck/></S.Button>
      </S.Form>
      <S.Button onClick={handleModalOpen} aria-label={"더보기"}>
        <MoreHorizontalOutline />
      </S.Button>
      <ModalTaskAction
        taskId={id}
        title={title}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onTaskDelete={deleteTask}
        onTaskEdit={changeEditFocus}
      ></ModalTaskAction>
    </S.FormContainer>
  );
};
