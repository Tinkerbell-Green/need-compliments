import styled from "styled-components";
import {GoalColor} from "api";
import {Input as InputUnderline} from "components/atoms/inputUnderline/inputUnderline.styled";

export const ButtonContainer = styled.div`
position: fixed;
bottom: 10px;
width: 100%;
height: 2rem;
padding: 0 2rem 0 2rem;
box-sizing: border-box;
`

export const Button = styled.button`
width: 100%;
height: 100%;
background-color: #1F1F1F;
border-radius: 5px;
`

export const DeleteButton = styled(Button)`
margin-right: 3px;

>span{
    color: #CB535A;
}
`

export const GoalTitle = styled(InputUnderline)<{isUnderline:boolean,color: GoalColor }>`
width: 100%;
height: 2rem;
padding: 0.6rem 0 0.6rem 0;
font-size: 1rem;
outline: none;
color: ${props => props.theme.colors.goals[props.color]};
background: transparent;
margin-bottom: 0.7rem;
`

export const ColorPalette = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template: repeat(2, 3rem) / repeat(6, 19.2%);
`

export const OneColor = styled.button<{ color: GoalColor }>`
width: 1.5rem;
height: 1.5rem;
border-radius: 50%;
border: 1px solid ${props => props.theme.colors.black};
margin: 0 0rem 1rem 0;
background: ${props => props.theme.colors.goals[props.color]};
`