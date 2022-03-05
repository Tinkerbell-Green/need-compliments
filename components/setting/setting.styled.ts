import styled from "styled-components";

// TODO: goalsForm와 겹치는 부분이라 빼놓으면 좋을 듯
export const SubHeading = styled.span`
color: ${props => props.theme.colors["gray-400"]};
padding: 0.8rem 0 0.8rem 0;
font-size: 0.8rem;
`

export const infoList = styled.ul`
display: flex;
`

export const infoListItem = styled.li`
list-style: none;
`

export const email = styled.span`
color: ${props => props.theme.colors["white"]};
font-size:1rem;
`

export const name = styled.span`

`