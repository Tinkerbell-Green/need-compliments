import styled from "styled-components";

export const Icon = styled.div<{color:string,isRotate:boolean}>`
  width:26px;
  height:26px;
  padding:2px;
  margin: 5px;
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