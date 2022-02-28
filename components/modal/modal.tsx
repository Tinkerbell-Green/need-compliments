import React from "react";
import * as S from "./modal.styled";

export const Modal = () => (
  <S.Container>
    <S.Content>
      <h3>work out</h3>
      <S.Buttons>
        <ul>
          <li>
            <S.ModalBtn>수정</S.ModalBtn>
          </li>
        </ul>
        <ul>
          <li>
            <button>오늘 또 하기</button>
          </li>
        </ul>
        <ul>
          <li>
            <button>날짜 바꾸기</button>
          </li>
        </ul>
        <ul>
          <li>
            <button>순서 변경</button>
          </li>
        </ul>
        <ul>
          <li>
            <button>삭제</button>
          </li>
        </ul>
      </S.Buttons>
    </S.Content>
  </S.Container>
);
