import React, {ReactNode} from "react";
import * as S from "./modal.styled";

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
        {children}
      </S.Modal>
    </S.Background>
  );
};
