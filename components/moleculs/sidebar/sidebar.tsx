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
    <S.MenuOverlay
      onClick={onClose}
      className={`${isOpen ? "show" : "hidden"}`}>
      <S.MenuContents className={`menu ${isOpen ? "show" : "hidden"}`}>
        {children}
      </S.MenuContents>
    </S.MenuOverlay>
    
  );
};
