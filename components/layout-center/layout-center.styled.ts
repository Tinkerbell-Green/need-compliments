import styled from "styled-components"

export const LayoutCenter = styled.div`
  background-color: ${props => props.theme.colors.black};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`