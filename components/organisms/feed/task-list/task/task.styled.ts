import styled from "styled-components";
import {GoalColor} from "stores/data";

export const FormContainer = styled.li<{isEditing:boolean,color:GoalColor}>`
width:100%;
display: flex;
justify-content: space-between;
margin-top: 10px;

border-bottom: 1.5px solid transparent;
border-color: ${props => (props.isEditing && props.theme.colors.goals[props.color])};
transition: border-color 0.3s ease-in;
`;

export const Form = styled.form`
width: 100%;
display: flex;
justify-content: space-between;
`;

export const Input = styled.input`
width: 100%;
margin-bottom: 8px;
background-color: transparent;
outline: none;
border:none;
font-size: 0.875rem;
`;
export const Button = styled.button`
cursor: pointer;
width:24px;
height:24px;
padding:0px;
margin-left: 5px;
color: inherit;
&:hover{
  color: #6AAC5E;
}
`;
