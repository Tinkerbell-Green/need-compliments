import styled from "styled-components";

export const Form = styled.form<{isEditing:boolean,color:string}>`
width:90%;
display: flex;
justify-content: space-between;
border-bottom: 1px solid transparent;
border-color: ${props => (props.isEditing && props.color)};
margin-top: 10px;

transition: border-color 0.3s linear;
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
width:20px;
height:20px;
padding:0px;
`;
