import {CloseOutline} from "@styled-icons/evaicons-outline";
import React, {ReactNode} from "react";
import * as S from "./sidebar.styled";
import {Icon} from "components/atoms/icon";

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
      className={`menuClose ${isOpen ? "show" : "hidden"}`}>
      <S.MenuContents className={`menuClose ${isOpen ? "show" : "hidden"}`}>
        <S.CloseButton><Icon onClick={onClose}><CloseOutline/></Icon></S.CloseButton>
        {children}
      </S.MenuContents>
    </S.MenuOverlay>
    
  );
};
