import {MoreHorizontalOutline} from "@styled-icons/evaicons-outline";
import React, {useCallback, useRef, useState, useEffect} from "react";
import * as S from "./task.styled";

type TaskProps = {
	id: string;
	color: string;
	title: string;
	onTaskDelete: (value: string) => void;
  onTaskUpdate: (id: string, text:string) => void;
};

export const Task = ({
  id, 
  color, 
  title, 
  onTaskDelete,
  onTaskUpdate
}: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const InputRef = useRef<HTMLInputElement>(null);

  const handleModalOpen: React.MouseEventHandler = (event) => {
    event.preventDefault();
    //TODO: modal open
  };

  const deleteTask = useCallback((id)=>{
    onTaskDelete(id);
  },[onTaskDelete])

  const saveTask = useCallback((id,inputValue)=>{
    onTaskUpdate(id,inputValue);
  },[onTaskUpdate]);

  const handleSubmit = useCallback((event : React.FormEvent |  React.FocusEvent)=>{
    event.preventDefault();
    setIsEditing(false);
    
    if(!inputValue && !title){
      deleteTask(id);
      return;
    }
    
    if(inputValue){
      saveTask(id,inputValue);
    }else{
      setInputValue(title);
    }

  },[saveTask,deleteTask,id,inputValue,title])

  const handleChange:React.ChangeEventHandler = useCallback(() => {
    const currentValue = InputRef.current?.value || "";
    setInputValue(currentValue);
  },[]);

  return (
    <S.FormContainer
      isEditing={isEditing}
      color={color}>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          autoFocus={title ? false : true}
          value={inputValue}
          placeholder="입력"
          type="text"
          ref={InputRef}
          onChange={handleChange}
          onBlur={handleSubmit}
          onFocus={() => setIsEditing(true)}
        ></S.Input>
      </S.Form>
      <S.Button onClick={handleModalOpen}>
        <MoreHorizontalOutline />
      </S.Button>
    </S.FormContainer>
  );
};
