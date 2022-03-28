import {CloseOutline} from "@styled-icons/evaicons-outline";
import React, {ReactNode} from "react";
import * as S from "./modal.styled";
import {Icon} from "components/atoms/icon"

export type ModalProps = {
  children: ReactNode,
  isOpen: boolean,
  onClose: ()=>void,
}

export const Modal = ({
  children,
  isOpen,
  onClose,
}: ModalProps) => {
  const onBackgroundClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const isModalClicked =
      e.target instanceof Element && e.target.closest(".modal") !== null;
    if (isModalClicked) return;
    onClose();
  };

  return (
    <S.Background isOpen={isOpen} onClick={onBackgroundClick}>
      <S.Modal isOpen={isOpen} className="modal">
        <S.CloseButton onClick={onClose} aria-label={"닫기"}><Icon size={20}><CloseOutline/></Icon></S.CloseButton>
        {children}
      </S.Modal>
    </S.Background>
  );
};
