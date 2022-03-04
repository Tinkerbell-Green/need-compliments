import { LayoutMain } from './../layout-main/layout-main';
import styled from "styled-components";

export const DeleteButton = styled.button`
position: fixed;
bottom: 10px;
width: 97%;
height: 2rem;
background-color: #1F1F1F;
border-radius: 5px;

>span{
    color: #CB535A;
}
`

export const SubHeading = styled.span`
color: #363636;
padding: 0.8rem 0 0.8rem 0;
font-size: 0.6rem;
`

export const GoalTitle = styled.input`
width: 100%;
height: 2rem;
padding: 0.6rem 0 0.6rem 0;
font-size: 0.9rem;
border: none;
outline: none;
color: #D7B84B;

&:focus{
    border-bottom: 1.9px solid #D7B84B;
}
`