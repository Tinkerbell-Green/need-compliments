import styled from "styled-components";
import {GoalColor} from "stores/data";

export const Input = styled.input<{onUnderline:boolean,color:GoalColor}>`
border-bottom: 1.5px solid transparent;
border-color: ${props => (props.onUnderline && props.theme.colors.goals[props.color])};
transition: border-color 0.3s ease-in;
`;