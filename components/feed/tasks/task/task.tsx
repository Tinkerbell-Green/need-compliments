import {MoreHorizontalOutline} from "@styled-icons/evaicons-outline";
import React, {useCallback, useRef, useState, useEffect} from "react";
import * as S from "./task.styled";
import {Modal} from "components/modal";
import {
  useDataSaga,
  DataActionType,
  DataSagaStatus,
  TaskData,
} from "stores/data";

type TaskProps = {
	id: string;
	color: string;
	title: string;
  onDeleteTask : (value: string)=>void;
};

export const Task = ({
  id, 
  color, 
  title,
  onDeleteTask
}: TaskProps) => {
  const {fetch: getTasksByDaysFetch, data: getTasksByDaysData, refetch: getTasksByDaysRefetch} = useDataSaga<DataActionType.GET_TASKS_BY_DAYS>(DataActionType.GET_TASKS_BY_DAYS)
  const {fetch: updateTaskFetch, status: updateTaskStatus} =
		useDataSaga<DataActionType.UPDATE_TASK>(DataActionType.UPDATE_TASK);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const InputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal: React.MouseEventHandler = (event) => {
    event.preventDefault();
    //TODO: modal open
  };

  const handleFocus: React.FocusEventHandler = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleUpdateTask = useCallback(
    (event: React.ChangeEvent | React.FormEvent | React.FocusEvent) => {
      // event.preventDefault();
      setIsEditing(false);
      console.log("submit");

      if (inputValue) {
        updateTaskFetch({
          pathSegments: [id],
          data: {
            title: inputValue,
          },
        });
      } else {
        title
          ? setInputValue(title)
          : onDeleteTask(id)
      }
    },
    [updateTaskFetch, onDeleteTask,inputValue, id, title]
  );

  const handleChange = () => {
    const currentValue = InputRef.current?.value;
    setInputValue(currentValue ? currentValue : "");
  };

  useEffect(()=>{
    if (updateTaskStatus === DataSagaStatus.SUCCEEDED){
      getTasksByDaysRefetch()
    }
  },[getTasksByDaysRefetch, updateTaskStatus])

  return (
    <S.Form 
      isEditing={isEditing} 
      color={color} 
      onSubmit={()=>console.log("submit")}>
      <S.Input
        value={inputValue}
        placeholder="입력"
        type="text"
        ref={InputRef}
        onChange={handleChange}
        onBlur={handleUpdateTask}
        onFocus={handleFocus}
      ></S.Input>
      <S.Button onClick={handleOpenModal}>
        <MoreHorizontalOutline />
      </S.Button>
    </S.Form>
  );
};
