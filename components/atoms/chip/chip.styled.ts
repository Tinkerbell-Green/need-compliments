import styled from "styled-components";
import {GoalColor} from "api";

const MARGIN = 4;
const ICON_SIZE = 18;

export const Chip = styled.div<{clickable:boolean}>`
  display: flex;
  width:fit-content;
  height: fit-content;
  background-color: rgb(42,42,42);
  border-radius: 5px;
  align-items: center;
  padding: 10px 12px;
  cursor: ${props => props.clickable && "pointer"};
  
  &:hover{
    background-color:${props => props.clickable && "#616161"};
  };
`;

export const Icon = styled.div`
  margin-right: ${MARGIN}px;
`;

export const Label = styled.div<{color: GoalColor}>`
  color:${props => props.color && props.theme.colors.goals[props.color]};
  font-size: 0.8rem;
  font-weight: 600;
`;

export const AddIcon = styled.button`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:0;
  background-color: #464646;
  border-radius: 50%;
  margin-left: ${MARGIN}px;
  color: ${props => props.theme.colors["gray-300"]};
  cursor: pointer;

  &:hover{
    color: #616161;
  }`
