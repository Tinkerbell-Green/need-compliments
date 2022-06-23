import styled from "styled-components";

export const Reaction = styled.li<{clicked:boolean}>`
padding: 5px;
border-radius: 5px;
font-size: 1.25rem;
cursor: pointer;
&:hover, &:focus{
  background-color: gray;
}
background-color: ${props => props.clicked && "#575757"};
`;