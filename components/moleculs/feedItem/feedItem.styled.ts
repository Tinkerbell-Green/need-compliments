import styled from "styled-components";

export const Item = styled.ul`
width:100%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 5px;
margin-top: 5px;
border-radius: 5px;
cursor: pointer;
&:hover, &:focus{
  background:  #444444;
}

@media screen and (max-width: ${props => props.theme.media.sm}px){
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
`;

export const Goal = styled.div`
width: 160px;
`;

export const Task = styled.p`
flex-grow: 1;
flex-shrink: 2;
font-size: 0.875rem;
min-width:200px;

@media screen and (max-width: ${props => props.theme.media.sm}px){
  padding: 10px 0;
}
`;
export const Contents = styled.div`
align-items: center;
`;

export const Info = styled.div`
width:fit-content;
justify-content: space-between;
align-items: baseline;
`;

export const ReactionList = styled.ul`
display:flex;
align-items: center;
`;

export const Reaction = styled.li`
padding: 5px;
border-radius: 5px;
font-size: 1.25rem;
cursor: pointer;
&:hover, &:focus{
  background-color: gray;
}
`;

export const Li = styled.li`
font-size: 0.65rem;
display: flex;
align-items: center;
margin-left: 10px;
`;
export const Count = styled.div`
font-size: 0.8rem;
  margin-left: 12px;
`;