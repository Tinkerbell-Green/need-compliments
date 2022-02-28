import styled from "styled-components"

export const Container = styled.section`
width:100%;
height:100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,0.9);
`

export const Content = styled.div`
width:30vw;
height: 20vh;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 10px;
background-color: #212222;
`

export const Buttons = styled.div`
display: flex;
flex-direction: row;
`

export const ModalBtn = styled.button`
width: 2rem;
height: 2rem;
cursor: pointer;
`