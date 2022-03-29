import styled from "styled-components"

export const LayoutMain = styled.div`
  background-color: ${props => props.theme.colors.black};
  min-width: 100%;
  min-height: 100vh;
  flex-direction: column;
`

export const Contents = styled.main`
  width:90%;
  margin: 50px auto;
  flex-direction: column;

  @media screen and (min-width: ${props => props.theme.media.md}px) {
    width: 84%;
  }
`;
