import styled from "styled-components"

export const LayoutNavigation = styled.div`
  background-color: ${props => props.theme.colors.black};
  min-width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${props => props.theme.media.md}px;
  width:60%;
  @media screen and (max-width: ${props => props.theme.media.md}px){
    width:80%;
  }
`