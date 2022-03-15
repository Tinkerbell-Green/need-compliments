import {Pencil, TrashAlt} from "@styled-icons/boxicons-regular";
import {ArrowClockwise} from "@styled-icons/fluentui-system-filled";
import {CalendarRtl} from "@styled-icons/fluentui-system-regular";
import {SwitchVertical} from "@styled-icons/heroicons-outline";
import React, {useCallback} from "react";
import * as S from "./modalTaskAction.styled";
import {Modal} from "components/moleculs/modal";

type ModalTaskAction = {
  isModalOpen: boolean,
  title: string,
  onModalClose : ()=>void,
  onTaskDelete: ()=>void,
  onTaskEdit: ()=>void,
}

export const ModalTaskAction = ({
  isModalOpen,
  title,
  onModalClose,
  onTaskDelete,
  onTaskEdit
}:ModalTaskAction) => {
  const editTask = useCallback(()=>{
    onTaskEdit();
    onModalClose();
  },[onTaskEdit,onModalClose]);

  const deleteTask = useCallback(()=>{
    onTaskDelete();
    onModalClose();
  },[onTaskDelete,onModalClose])

  return (
    <Modal 
      isModalOpen={isModalOpen} 
      onModalClose={onModalClose}>
      <S.Title>{title}</S.Title>
      <S.ActionList>
        <S.Action onClick={editTask}>
          <S.Button>
            <Pencil></Pencil>
          </S.Button>
          <span>수정</span>
        </S.Action>
        <S.Action>
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
        </S.Action>
        <S.Action onClick={deleteTask}>
          <S.Button>
            <TrashAlt></TrashAlt>
          </S.Button>
          <span>삭제</span>
        </S.Action>
      </S.ActionList>
    </Modal>
  );
};
