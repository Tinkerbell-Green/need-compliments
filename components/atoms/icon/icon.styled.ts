import styled from "styled-components";

export const Icon = styled.span<{color:string,isRotate:boolean,size?:number}>`
  display: flex;
  width:${props => props.size ? props.size : 28}px;
  height:${props => props.size ? props.size : 28}px;
  color: ${props => props.color ? props.color : props.theme.colors["gray-300"]};

  ${props => props.isRotate && `
  transform: rotate(0deg);
  transition: all 0.3s ease-in-out;

  &:hover, &:focus{
    transform: rotate(90deg);
  }
  `};
`;