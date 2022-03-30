import styled,{css} from "styled-components";

export const MenuOverlay = styled.div<{isVisible:boolean}>`
  z-index: 10;
  position: fixed;
  top:0;
  left: 0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
  transition: all 0.2s ease-in-out;
  
  ${props => props.isVisible 
    ? css`
    opacity: 1;
    visibility: visible;` 
    : css`
    opacity: 0;
    visibility: hidden;
    width: 0px;
  `}
`;

export const MenuContents = styled.section<{isVisible:boolean}>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top:0;
  left:100%;
  width: 280px;
  height: 100%;
  padding: 6px;
  background-color: #222222;
  transition: all 0.2s ease-in-out;
  
  ${props => props.isVisible 
    ? css`
    visibility: visible;
    transform:translateX(-100%);`
    : css`
    visibility: hidden;
    transform: translateX(0%);
  `}
`;