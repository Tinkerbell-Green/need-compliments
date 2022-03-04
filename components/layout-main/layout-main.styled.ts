import styled from "styled-components"

const ICON_SIZE = 32;

export const LayoutMain = styled.div`
  background-color: ${props => props.theme.colors.black};
  min-width: 100%;
  min-height: 100%;
  flex-direction: column;
`

export const Contents = styled.div`
  width: 100%;
  margin: 20px;
`;

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
  cursor: pointer;
`;

export const MenuIcon = styled(Icon)``;
