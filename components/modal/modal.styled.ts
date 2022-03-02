import { TrashAlt } from "@styled-icons/fa-regular";
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
width:34vw;
height: 25vh;
min-height: 350px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 10px;
background-color: #212222;
padding:2rem;
`

export const Title = styled.h3`
font-size: 1.2rem;
padding: 1.5rem 0 1.5rem 0;
`

export const StyledUl = styled.ul`
display: flex;
flex-wrap: wrap;
width:100%;
height: 100%;
`

export const StyledLi = styled.li`
display: flex;
flex-direction: column;
align-items: center;
width: 20%;
min-width: 50px;
margin: 0.5rem 0.6rem 0.8rem 0.6rem;

>span{
    font-size: 1rem;
}
`

export const ModalBtn = styled.button`
width: 4rem;
height: 4rem;
background-color: #2F2F2F;
border-radius: 50%;
padding:18%;
margin-bottom: 1rem;
cursor: pointer;
`

export const Icon = styled.div`
width:100%;
height: 100%;
`