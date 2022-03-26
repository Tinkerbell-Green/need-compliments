import styled from "styled-components";

export const Item = styled.ul`
width:100%;
display: flex;
align-items: center;
margin-top: 12px;
`;
export const Task = styled.li`
flex-grow: 1;
margin-left: 18px;
flex-shrink: 2;
font-size: 0.875rem;
min-width:200px;
`;

export const Reaction = styled.li`
display: flex;
align-items: center;
flex-shrink: 2;
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