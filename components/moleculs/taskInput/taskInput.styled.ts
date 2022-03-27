import styled from "styled-components";
import {S} from "components/atoms/inputUnderline";
import {GoalColor} from "stores/data";

export const FormContainer = styled.li`
width:100%;
display: flex;
justify-content: space-between;
margin-top: 10px;
`;

export const Form = styled.form`
width: 100%;
display: flex;
justify-content: space-between;
`;

export const Input = styled(S.InputUnderline)<{onUnderline:boolean,color:GoalColor}>`
width: 100%;
height:100%;
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
