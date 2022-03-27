import styled from "styled-components"

const HEAHER_HEIGHT = 28

export const LayoutNavigation = styled.div`
  background-color: ${props => props.theme.colors.black};
  min-width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`

export const Header = styled.header`
  position: sticky;
  z-index: 1;
  top:0;
  width: 100%;
  height: ${HEAHER_HEIGHT}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`

export const LeftButton = styled.button`
  width: 36px;
  height: 36px;
`

export const RightButton = styled.button`
  width: 36px;
  height: 36px;
`

export const RightDiv = styled.div`
  width: 36px;
  height: 36px;
`

export const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
`

export const Content = styled.main`
  margin-top: ${HEAHER_HEIGHT}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`