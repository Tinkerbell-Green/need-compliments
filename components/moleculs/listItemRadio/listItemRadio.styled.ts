import styled from "styled-components";

export const RadioContainer = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`

export const RadioIconAndLabel = styled.div`
width:100%;
height: 100%;
display: flex;
align-items: center;
`

export const PublicBookIconContainer = styled.div`
width: 1.5rem;
padding: 0.2rem;
margin-right: 0.5rem;
`

export const Label = styled.label`
font-size: 1rem;
padding-bottom: 0.1rem;
`

export const Input = styled.input`
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
border-radius: 50%;
width: 16px;
height: 16px;
border: 1px solid ${props => props.theme.colors["gray-400"]};;
margin-right: 5px;
&:checked{
  border: 2px solid ${props => props.theme.colors["gray-400"]};;
  background-color: white;
}
`