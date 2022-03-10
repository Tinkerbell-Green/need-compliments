import {MoreHorizontalOutline} from "@styled-icons/evaicons-outline";
import React, {useRef, useState} from "react";
import * as S from "./task.styled";
import {Modal} from "components/modal"

type TaskProps = {
  color:string,
  title:string,
}

export const Task = ({
  color,
  title
}: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const InputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal:React.MouseEventHandler = (event)=>{
    event.preventDefault();
    //TODO: modal open
  }

  const handleFocusInput:React.FocusEventHandler = ()=>{
    setIsEditing(true);
  }

  const handleSaveInput = async (event:React.ChangeEvent | React.FormEvent | React.FocusEvent)=>{
    event.preventDefault();
    if(inputValue){
      //TODO: await (현재 inputValue를 저장한다.)
    }else{
      setInputValue(title);
    }
    setIsEditing(false);
  }

  const handleInputValue = ()=>{
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
        onChange={handleInputValue}
        onSubmit={handleSaveInput}
        onBlur={handleSaveInput}
        onFocus={handleFocusInput}>
      </S.Input>
      <S.Button 
        onClick={handleOpenModal}><MoreHorizontalOutline/>
      </S.Button>
    </S.Form>
  )
}