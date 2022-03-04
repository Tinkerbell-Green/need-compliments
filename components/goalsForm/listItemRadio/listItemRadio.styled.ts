import styled from "styled-components";

export const RadioContainer = styled.div`
width: 100%;
height: 2rem;
display: flex;
align-items: center;
margin-bottom: 1rem;
`

export const RadioIconAndLabel = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
`

export const LeftIconContainer = styled.div`
width: 2rem;
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

  border: 1px solid #999;
  margin-right: 5px;

  &:checked{
    border: 2px solid #999;
    background-color: white;
  }
`