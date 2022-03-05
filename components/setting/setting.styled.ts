import styled from "styled-components";

// TODO: goalsForm와 겹치는 부분이라 빼놓으면 좋을 듯
export const SubHeading = styled.span`
color: ${props => props.theme.colors["gray-400"]};
padding: 0.8rem 0 0.8rem 0;
font-size: 0.8rem;
`

export const DeleteAccount = styled(SubHeading)`
color: ${props => props.theme.colors["rose-500"]};
`

export const infoList = styled.ul`
display: flex;
flex-direction: column;
justify-content: center;
`

export const infoListItem = styled.div`
list-style: none;
display: flex;
justify-content: space-between;
margin: 0.6rem 0 0.6rem 0;
`

export const infoListItemEmail = styled(infoListItem)`
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