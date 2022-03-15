import React, {useState, ReactNode} from "react";
import * as S from "./modal.styled";

export type ModalProps = {
  children: ReactNode
}

export const Modal = ({
  children
}: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const onBackgroundClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const isModalClicked =
      e.target instanceof Element && e.target.closest(".modal") !== null;
    if (isModalClicked) return;
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <S.Background onClick={onBackgroundClick}>
          <S.Modal className="modal">
            {children}
          </S.Modal>
        </S.Background>
      )}
    </>
  );
};
