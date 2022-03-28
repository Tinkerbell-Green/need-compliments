import {Pencil, TrashAlt} from "@styled-icons/boxicons-regular";
import {ArrowClockwise} from "@styled-icons/fluentui-system-filled";
import {CalendarRtl} from "@styled-icons/fluentui-system-regular";
import {SwitchVertical} from "@styled-icons/heroicons-outline";
import React, {useCallback} from "react";
import * as S from "./modalTaskAction.styled";
import {Icon} from "components/atoms/icon"
import {Modal} from "components/moleculs/modal";

type ModalTaskAction = {
  taskId:string,
  isOpen: boolean,
  title: string,
  onClose : ()=>void,
  onTaskDelete: (id:string)=>void,
  onTaskEdit: ()=>void,
}

export const ModalTaskAction = ({
  taskId,
  isOpen,
  title,
  onClose,
  onTaskDelete,
  onTaskEdit
}:ModalTaskAction) => {
  const editTask:React.MouseEventHandler = useCallback(()=>{
    onTaskEdit();
    onClose();
  },[onTaskEdit,onClose]);

  const deleteTask:React.MouseEventHandler = useCallback(()=>{
    onTaskDelete(taskId);
    onClose();
  },[onTaskDelete,onClose,taskId])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}>
      <S.Title>{title}</S.Title>
      <S.ActionList>
        <S.Action>
          <S.Button onClick={editTask} aria-label={"수정하기"}>
            <Icon size={24}><Pencil></Pencil></Icon>
          </S.Button>
          <span>수정</span>
        </S.Action>
        {/* <S.Action>
          <S.Button>
            <ArrowClockwise></ArrowClockwise>
          </S.Button>
          <span>오늘 또 하기</span>
        </S.Action>
        <S.Action>
          <S.Button>
            <CalendarRtl></CalendarRtl>
          </S.Button>
          <span>날짜 바꾸기</span>
        </S.Action>
        <S.Action>
          <S.Button>
            <SwitchVertical></SwitchVertical>
          </S.Button>
          <span>순서 변경</span>
        </S.Action> */}
        <S.Action>
          <S.Button onClick={deleteTask} aria-label={"삭제하기"}>
            <Icon size={24}><TrashAlt></TrashAlt></Icon>
          </S.Button>
          <span>삭제</span>
        </S.Action>
      </S.ActionList>
    </Modal>
  );
};
