import { Pencil, TrashAlt } from "@styled-icons/boxicons-regular";
import { ArrowClockwise } from "@styled-icons/fluentui-system-filled";
import { CalendarRtl } from "@styled-icons/fluentui-system-regular";
import { SwitchVertical } from "@styled-icons/heroicons-outline";
import React, { useState } from "react";
import * as S from "./modal.styled";

export const Modal = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const onModalOff = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const clicked: Element | null = (e.target! as Element).closest(".modal");
    if (clicked) return;
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <S.OutsideModal
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            onModalOff(e);
          }}
        >
          <S.Modal className="modal">
            <S.Title>work out</S.Title>
            <S.StyledUl>
              <S.StyledLi>
                <S.Button>
                  <Pencil></Pencil>
                </S.Button>
                <span>수정</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.Button>
                  <ArrowClockwise></ArrowClockwise>
                </S.Button>
                <span>오늘 또 하기</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.Button>
                  <CalendarRtl></CalendarRtl>
                </S.Button>
                <span>날짜 바꾸기</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.Button>
                  <SwitchVertical></SwitchVertical>
                </S.Button>
                <span>순서 변경</span>
              </S.StyledLi>
              <S.StyledLi>
                <S.Button>
                  <TrashAlt></TrashAlt>
                </S.Button>
                <span>삭제</span>
              </S.StyledLi>
            </S.StyledUl>
          </S.Modal>
        </S.OutsideModal>
      )}
    </>
  );
};
