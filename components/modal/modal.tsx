import { Pencil, TrashAlt } from "@styled-icons/boxicons-regular";
import { ArrowClockwise } from "@styled-icons/fluentui-system-filled";
import { CalendarRtl } from "@styled-icons/fluentui-system-regular";
import { SwitchVertical } from "@styled-icons/heroicons-outline";
import React, { useState } from "react";
import * as S from "./modal.styled";

export const Modal = () => {
  const [isModalOpenBtnClick, setModalOpenBtnClick] = useState<boolean>(true);

  const onBackgroundClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const isModalClicked =
      e.target instanceof Element && e.target.closest(".modal") !== null;
    if (isModalClicked) return;
    setModalOpenBtnClick(false);
  };

  return (
    <>
      {isModalOpenBtnClick && (
        <S.Background onClick={onBackgroundClick}>
          <S.Modal className="modal">
            <S.Title>work out</S.Title>
            <S.ActionContainer>
              <S.ActionList>
                <S.Button>
                  <Pencil></Pencil>
                </S.Button>
                <span>수정</span>
              </S.ActionList>
              <S.ActionList>
                <S.Button>
                  <ArrowClockwise></ArrowClockwise>
                </S.Button>
                <span>오늘 또 하기</span>
              </S.ActionList>
              <S.ActionList>
                <S.Button>
                  <CalendarRtl></CalendarRtl>
                </S.Button>
                <span>날짜 바꾸기</span>
              </S.ActionList>
              <S.ActionList>
                <S.Button>
                  <SwitchVertical></SwitchVertical>
                </S.Button>
                <span>순서 변경</span>
              </S.ActionList>
              <S.ActionList>
                <S.Button>
                  <TrashAlt></TrashAlt>
                </S.Button>
                <span>삭제</span>
              </S.ActionList>
            </S.ActionContainer>
          </S.Modal>
        </S.Background>
      )}
    </>
  );
};
