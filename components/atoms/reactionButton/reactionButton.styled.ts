import styled from "styled-components";

export const Reaction = styled.button<{clicked:boolean}>`
padding: 5px;
border-radius: 5px;
font-size: 1.25rem;
cursor: pointer;
&:hover{
  background-color: gray;
}
background-color: ${props => props.clicked && "#575757"};
`;