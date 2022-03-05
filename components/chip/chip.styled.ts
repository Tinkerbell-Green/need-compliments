import styled from "styled-components";

export const Chip = styled.li`
  display: flex;
  width:fit-content;
  height: fit-content;
  background-color: #333333;
  border-radius: 5px;
  margin-top: 5px;
  align-items: center;
  padding: 10px 0;
`;

export const Icon = styled.div`
  width:18px;
  height:18px;
  margin-left: 10px;
`;

export const Label = styled.div`
  color:${props => props.color && props.color};
  font-size: 0.8rem;
  font-weight: 800;
  margin: 0 10px;
`;

export const AddIcon = styled.div`
  width:20px;
  height:20px;
  padding: 2px;
  background-color: #515151;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;

  &:hover{
    background-color: #616161;
  }
`;