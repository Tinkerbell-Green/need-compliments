import styled from "styled-components";

export const Form = styled.form<{color:string, isEditing:boolean}>`
width:90%;
display: flex;
justify-content: space-between;
border-bottom: ${props => {
    if(props.isEditing) 
      return `1px solid ${props.color}`;
    else return "none";
  }};
  margin-top: 10px;
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
