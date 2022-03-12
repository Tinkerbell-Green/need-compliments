import {MoreHorizontalOutline} from "@styled-icons/evaicons-outline";
import React, {useCallback, useRef, useState,useEffect} from "react";
import * as S from "./task.styled";
import {Modal} from "components/modal"
import {
  useDataSaga,
  DataActionType,
  DataSagaStatus,
  TaskData,
} from "stores/data";

type TaskProps = {
  id:string,
  color:string,
  title:string,
}

export const Task = ({
  id,
  color,
  title
}: TaskProps) => {
  const {
    refetch: getTasksByDaysRefetch,
  } = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(
    DataActionType.GET_TASKS_BY_DAYS
  );
  const {fetch: updateTaskFetch, status: updateTaskStatus} =
		useDataSaga<DataActionType.UPDATE_TASK>(DataActionType.UPDATE_TASK);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const InputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if (updateTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, updateTaskStatus])

  const handleOpenModal:React.MouseEventHandler = (event)=>{
    event.preventDefault();
    //TODO: modal open
  }

  const handleFocus:React.FocusEventHandler = useCallback(()=>{
    setIsEditing(true);
  },[])

  const handleUpdateTask = (event:React.ChangeEvent | React.FormEvent | React.FocusEvent)=>{
    event.preventDefault();

    if(inputValue){
      updateTaskFetch({
        pathSegments: [id],
        data: {
          title: inputValue,
        }
      })
    }else{
      setInputValue(title);
    }
    setIsEditing(false);
  }

  const handleChange = ()=>{
    const currentValue = InputRef.current?.value;
    setInputValue(currentValue ? currentValue : "");
  }

  return (
    <S.Form 
      isEditing={isEditing}
      color={color}>
      <S.Input 
        value={inputValue}
        placeholder="입력" 
        type="text"
        ref={InputRef}
        onChange={handleChange}
        onSubmit={handleUpdateTask}
        onBlur={handleUpdateTask}
        onFocus={handleFocus}>
      </S.Input>
      <S.Button 
        onClick={handleOpenModal}><MoreHorizontalOutline/>
      </S.Button>
    </S.Form>
  )
}