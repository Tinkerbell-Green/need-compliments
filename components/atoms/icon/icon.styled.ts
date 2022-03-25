import styled from "styled-components";

export const Icon = styled.button<{rotate:boolean,color:string}>`
  width:28px;
  height:28px;
  padding:2px;
  margin: 5px;
  cursor: pointer;
  color: ${props => props.color};

  ${props => props.rotate && `
  transform: rotate(0deg);
  transition: all 0.3s ease-in-out;

  &:hover, &:focus{
    transform: rotate(90deg);
  }
  `}
  
`;