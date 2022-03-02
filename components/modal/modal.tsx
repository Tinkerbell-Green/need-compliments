import { Pencil, TrashAlt } from "@styled-icons/boxicons-regular";
import { ArrowClockwise } from "@styled-icons/fluentui-system-filled";
import { CalendarRtl } from "@styled-icons/fluentui-system-regular";
import { SwitchVertical } from "@styled-icons/heroicons-outline";
import React, { useState } from "react";
import * as S from "./modal.styled";

export const Modal = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const onModalOff = (e: MouseEvent) => {
    const clicked: Element | null = (e.target! as Element).closest(
      "innerModal"
    );
    console.log(e.target, clicked);
    if (clicked) return;
    setModalOpen(false);
  };

  return (
    <>
      <button>Modal Open!</button>
      {isModalOpen && (
        <S.Container
          onClick={(e: any) => {
            onModalOff(e);
          }}
        >
          <S.Content className="innerModal">
            <S.Title>work out</S.Title>
            <S.StyledUl>
              <S.StyledLi>
                <S.ModalBtn>
                  <Pencil></Pencil>
                </S.ModalBtn>
                <span>수정</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.ModalBtn>
                  <ArrowClockwise></ArrowClockwise>
                </S.ModalBtn>
                <span>오늘 또 하기</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.ModalBtn>
                  <CalendarRtl></CalendarRtl>
                </S.ModalBtn>
                <span>날짜 바꾸기</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.ModalBtn>
                  <SwitchVertical></SwitchVertical>
                </S.ModalBtn>
                <span>순서 변경</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.ModalBtn>
                  <TrashAlt></TrashAlt>
                </S.ModalBtn>
                <span>삭제</span>
              </S.StyledLi>
            </S.StyledUl>
          </S.Content>
        </S.Container>
      )}
    </>
  );
};
