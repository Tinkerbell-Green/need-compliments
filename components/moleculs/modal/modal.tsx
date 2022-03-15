import React, {ReactNode} from "react";
import * as S from "./modal.styled";

export type ModalProps = {
  children: ReactNode,
  isModalOpen: boolean,
  onModalClose: ()=>void,
}

export const Modal = ({
  children,
  isModalOpen,
  onModalClose,
}: ModalProps) => {
  const onBackgroundClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const isModalClicked =
      e.target instanceof Element && e.target.closest(".modal") !== null;
    if (isModalClicked) return;
    onModalClose();
  };

  return (
    <S.Background isModalOpen={isModalOpen} onClick={onBackgroundClick}>
      <S.Modal isModalOpen={isModalOpen} className="modal">
        {children}
      </S.Modal>
    </S.Background>
  );
};
