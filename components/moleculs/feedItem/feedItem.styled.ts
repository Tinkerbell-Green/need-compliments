import styled from "styled-components";

export const Item = styled.ul`
width:100%;
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 12px;
`;
export const Task = styled.li`
flex-basis: 50%;
flex-shrink: 2;
font-size: 0.875rem;
`;
export const Reaction = styled.li`
display: flex;
align-items: center;
flex-shrink: 2;
`;

export const Text = styled.li`
font-size: 0.65rem;
flex-shrink: 2;
`;
export const Count = styled.li`
font-size: 0.8rem;
  margin-left: 12px;
`;