import styled from "styled-components"

export const LayoutMain = styled.div`
  background-color: ${props => props.theme.colors.black};
  min-width: 100%;
  min-height: 100%;
  flex-direction: column;
`

export const Contents = styled.div`
  width: 100%;
  margin: 20px;
  flex-direction: column;
`;