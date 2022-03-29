import styled from "styled-components";

export const Item = styled.ul`
width:100%;
display: flex;
align-items: center;
padding: 10px 5px;
border-radius: 5px;
border: 1px solid transparent;
cursor: pointer;
&:hover, &:focus{
  background:  #444444;
}
`;

export const Goal = styled.div`
width: 120px;
`;

export const Task = styled.p`
flex-grow: 1;
margin-left: 18px;
flex-shrink: 2;
font-size: 0.875rem;
min-width:200px;
`;
export const ReactionList = styled.ul`
display:flex;
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
margin-left: 20px;
`;
export const Count = styled.div`
font-size: 0.8rem;
  margin-left: 12px;
`;