import {MoreHorizontalOutline} from "@styled-icons/evaicons-outline";
import React, {useCallback, useRef, useState, useEffect} from "react";
import * as S from "./task.styled";
import {Modal} from "components/modal";
import {useDataSaga,DataActionType,DataSagaStatus} from "stores/data";

type TaskProps = {
	id: string;
	color: string;
	title: string;
	onTaskDelete: (value: string) => void;
};

export const Task = ({
  id, 
  color, 
  title, 
  onTaskDelete
}: TaskProps) => {
  const {
    refetch: getTasksByDaysRefetch
  } = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS);
  const {
    fetch: updateTaskFetch, 
    status: updateTaskStatus
  } = useDataSaga<DataActionType.UPDATE_TASK>(DataActionType.UPDATE_TASK);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const InputRef = useRef<HTMLInputElement>(null);

  const handleModalOpen: React.MouseEventHandler = (event) => {
    event.preventDefault();
    //TODO: modal open
  };

  const saveTask = useCallback((id)=>{
    if(!inputValue){
      title ? setInputValue(title) : onTaskDelete(id);
      return;
    }

    updateTaskFetch({
      pathSegments: [id],
      data: {
        title: inputValue,
      }});
  },[inputValue,updateTaskFetch,onTaskDelete,title]);

  const handleSubmit = useCallback((event: React.FormEvent)=>{
    event.preventDefault();
    setIsEditing(false);
    saveTask(id);
  },[saveTask,id])

  const handleBlur = useCallback((event: React.FocusEvent) => {
    event.preventDefault();
    setIsEditing(false);
    saveTask(id);
  },[saveTask,id]);

  const handleChange = useCallback(() => {
    const currentValue = InputRef.current?.value || "";
    setInputValue(currentValue);
  },[]);

  useEffect(()=>{
    setIsEditing(title ? false : true);
  },[title]);

  useEffect(() => {
    if (updateTaskStatus === DataSagaStatus.SUCCEEDED) {
      getTasksByDaysRefetch();
    }
  }, [getTasksByDaysRefetch, updateTaskStatus]);

  return (
    <S.FormContainer
      isEditing={isEditing}
      color={color}>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          autoFocus
          value={inputValue}
          placeholder="입력"
          type="text"
          ref={InputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsEditing(true)}
        ></S.Input>
      </S.Form>
      <S.Button onClick={handleModalOpen}>
        <MoreHorizontalOutline />
      </S.Button>
    </S.FormContainer>
  );
};
