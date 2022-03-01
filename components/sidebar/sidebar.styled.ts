import styled from "styled-components";

const ICON_SIZE = 40;

export const IconContainerList = styled.ul`
  position: absolute;
  top:0;
  left:100%;
  transform: translateX(-100%);
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

export const IconContainer = styled.li`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
`;

export const MenuOverlay = styled.div`
  z-index: 10;
  position: absolute;
  top:0;
  left: 0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
`;

export const MenuContents = styled.section`
  z-index: 11;
  display: flex;
  flex-direction: column;
  position: absolute;
  top:0;
  left:100%;
  transform: translateX(-100%);
  width: 260px;
  height:100%;
  background-color: ${props => props.theme.colors["gray-800"]};
`;