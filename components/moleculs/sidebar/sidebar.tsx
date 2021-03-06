import React, {ReactNode} from "react";
import * as S from "./sidebar.styled";

export type SidebarProps = {
  children: ReactNode,
  isOpen: boolean,
  onClose: React.MouseEventHandler
}

export const Sidebar = ({
  children,
  isOpen,
  onClose,
}: SidebarProps) => {

  return (
    <S.MenuOverlay onClick={onClose} isVisible={isOpen}>
      <S.MenuContents className={"menu"} isVisible={isOpen}>
        {children}
      </S.MenuContents>
    </S.MenuOverlay>
    
  );
};
