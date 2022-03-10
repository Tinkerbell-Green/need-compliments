import styled from "styled-components";

const MARGIN = 4;

export const Chip = styled.div`
  display: flex;
  width:fit-content;
  height: fit-content;
  background-color: #333333;
  border-radius: 5px;
  align-items: center;
  padding: 10px 12px;
`;

export const Icon = styled.div`
  width:18px;
  height:18px;
  margin-right: ${MARGIN}px;
`;

export const Label = styled.div`
  color:${props => props.color && props.color};
  font-size: 0.875rem;
  font-weight: 800;
`;

export const AddIcon = styled.div`
  width:20px;
  height:20px;
  padding:1px;
  background-color: #464646;
  border-radius: 50%;
  margin-left: ${MARGIN}px;
  cursor: pointer;

  &:hover{
    background-color: #616161;
  }
`;