import {MoreHorizontalOutline} from "@styled-icons/evaicons-outline";
import React, {useCallback, useRef, useState} from "react";
import * as S from "./task.styled";
import {ModalTaskAction} from "components/organisms/modalTaskAction";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const InputRef = useRef<HTMLInputElement>(null);

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

  const changeEditFocus = useCallback(()=>{
    InputRef.current?.focus();
    setIsEditing(true);
  },[])

  return (
    <S.FormContainer
      isEditing={isEditing}
      color={color}>
      <ModalTaskAction
        taskId={id}
        title={title}
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        onTaskDelete={deleteTask}
        onTaskEdit={changeEditFocus}
      ></ModalTaskAction>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          autoFocus={title ? false : true}
          value={inputValue}
          placeholder="입력"
          type="text"
          ref={InputRef}
          onChange={handleChange}
          onBlur={handleSubmit}
          onFocus={changeEditFocus}
        ></S.Input>
      </S.Form>
      <S.Button onClick={handleModalOpen}>
        <MoreHorizontalOutline />
      </S.Button>
    </S.FormContainer>
  );
};
