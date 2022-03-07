import styled from "styled-components";
import { SubHeadingButton } from "components/subHeading/subHeadingButton/subHeadingButton.styled";

export const DeleteAccount = styled(SubHeadingButton)`
color: ${props => props.theme.colors["rose-500"]};
`

export const InfoList = styled.ul`
display: flex;
flex-direction: column;
justify-content: center;
`

export const InfoListItem = styled.div`
list-style: none;
display: flex;
justify-content: space-between;
margin: 0.6rem 0 0.6rem 0;
`

export const InfoListItemEmail = styled(InfoListItem)`
display: block;

> p{
margin: 1rem 0 1rem 0;
}
`

export const email = styled.p`
color: ${props => props.theme.colors["white"]};
font-size:1rem;
`

export const name = styled.span`

`