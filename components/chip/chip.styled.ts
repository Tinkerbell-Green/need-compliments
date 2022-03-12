import styled from "styled-components";

const MARGIN = 4;
const ICON_SIZE = 18;

export const Chip = styled.div`
  display: flex;
  width:fit-content;
  height: fit-content;
  background-color: rgb(42,42,42);
  border-radius: 5px;
  align-items: center;
  padding: 10px 12px;
`;

export const Icon = styled.div`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:1px;
  margin-right: ${MARGIN}px;
`;

export const Label = styled.div`
  color:${props => props.color && props.color};
  font-size: 0.8rem;
  font-weight: 600;
`;

export const AddIcon = styled.div`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:1px;
  background-color: #464646;
  border-radius: 50%;
  margin-left: ${MARGIN}px;
  cursor: pointer;

  &:hover{
    background-color: #616161;
  }
`;