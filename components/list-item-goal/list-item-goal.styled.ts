import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  width:fit-content;
  height: fit-content;
  background-color: rgba(255,255,255,0.2);
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  color:${props => props.color && props.color};
  font-size: 0.8rem;
  font-weight: 500;
`;

export const Left = styled.div`
  margin-right:8px;
`;

export const Right = styled.div`
  margin-left:8px;
`;