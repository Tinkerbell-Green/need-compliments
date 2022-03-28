import styled from "styled-components";

export const Icon = styled.div<{color:string,isRotate:boolean,size?:number}>`
  width:${props => props.size ? props.size : 28}px;
  height:${props => props.size ? props.size : 28}px;
  /* padding:${props => props.isRotate ? 0 : 2}px; */
  cursor: pointer;
  color: ${props => props.color ? props.color : props.theme.colors["gray-300"]};

  ${props => props.isRotate && `
  transform: rotate(0deg);
  transition: all 0.3s ease-in-out;

  &:hover, &:focus{
    transform: rotate(90deg);
  }
  `};
`;