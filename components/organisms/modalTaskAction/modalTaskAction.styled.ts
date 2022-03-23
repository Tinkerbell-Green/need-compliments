import styled from "styled-components"

const BUTTON_ICON_SIZE = 36;

export const Title = styled.h3`
width:90%;
font-size: 0.875rem;
margin: 16px;
text-align: center;
`

export const ActionList = styled.ul`
display: flex;
flex-wrap: wrap;
`

export const Action = styled.li`
display: flex;
flex-direction: column;
align-items: center;
width: 20%;
min-width: 50px;
margin: 8px 6px;
>span{
    width: max-content;
    font-size: 0.7rem;
}
`

export const Button = styled.button`
width: ${BUTTON_ICON_SIZE}px;
height: ${BUTTON_ICON_SIZE}px;
background-color: #2F2F2F;
border-radius: 50%;
padding:8px;
margin-bottom: 10px;
cursor: pointer;
`