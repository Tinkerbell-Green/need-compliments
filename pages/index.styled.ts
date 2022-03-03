import styled from "styled-components";

const ICON_SIZE = 28;

export const IconList = styled.ul`
  position: absolute;
  top:0;
  left:100%;
  transform: translateX(-100%);
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const Icon = styled.div`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:2px;
  margin: 0 8px;
  cursor: pointer;
`;

export const MenuIcon = styled(Icon)``;