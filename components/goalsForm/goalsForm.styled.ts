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

export const ColorPalette = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template: repeat(2, 3rem) / repeat(6, 19.2%);
`

export const OneColcor = styled.button`
width: 1.5rem;
height: 1.5rem;
border-radius: 50%;
border: 1px solid ${props => props.theme.colors.black};
margin: 0 0rem 1rem 0;
background: ${props => props.color};
`