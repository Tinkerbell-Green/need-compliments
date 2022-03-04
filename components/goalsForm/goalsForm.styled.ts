import styled from "styled-components";

export const DeleteButtonContainer = styled.div`
position: fixed;
bottom: 10px;
width: 100%;
height: 2rem;
padding: 0 2rem 0 2rem;
box-sizing: border-box;
`

export const DeleteButton = styled.button`
width: 100%;
height: 100%;
background-color: #1F1F1F;
border-radius: 5px;

>span{
    color: #CB535A;
}
`

export const SubHeading = styled.span`
color: ${props => props.theme.colors["gray-400"]};
padding: 0.8rem 0 0.8rem 0;
font-size: 0.8rem;
`

export const GoalTitle = styled.input`
width: 100%;
height: 2rem;
padding: 0.6rem 0 0.6rem 0;
font-size: 1rem;
border: none;
outline: none;
color: ${props => props.color};
background: transparent;
margin-bottom: 0.7rem;

&:focus{
    border-bottom: 1.9px solid ${props => props.color};
}
`

export const ColorBox = styled.div`
width: 1000px; // TODO: 지우기 default 사이즈에서 안 바뀌는 거 같음
`