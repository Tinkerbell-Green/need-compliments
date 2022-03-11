import styled from "styled-components"

export const Button = styled.button`
  padding: 8px 16px 8px;
  font-size: 1.2rem;
`

export const ListTask = styled.div`
  flex-direction: column;
  align-items: center;
  margin-top: 16;
`

export const ListItemTask = styled.div`
  padding: 4px 8px 4px;
  flex-direction: row;
  align-items: center;
`

export const IdTask = styled.span`
  color: ${props => props.theme.colors.textHint};
  font-size: 0.8rem;
`
export const TitleTask = styled.span`
  font-size: 1.2rem;
  margin-left: 8px;
`