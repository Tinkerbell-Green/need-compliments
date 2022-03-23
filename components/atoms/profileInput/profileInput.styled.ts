import styled from "styled-components";

export const InputContainer = styled.div`
width:100%;
border-bottom: 1px solid ${props => props.theme.colors["gray-700"]};
padding: 0.5rem 0 0.5rem 0;
`

export const InputName = styled.span`
display: inline-block;
width: 6rem;
font-size: 1rem;
padding:2px;
`

export const Input = styled.input`
width: 100%;
font-size: 1rem;
background: transparent;
border-color: transparent;
`