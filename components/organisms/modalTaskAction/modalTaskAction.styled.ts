import styled from "styled-components"

export const Title = styled.h3`
font-size: 1.2rem;
padding: 1.5rem 0 1.5rem 0;
`

export const ActionList = styled.ul`
display: flex;
flex-wrap: wrap;
width:100%;
height: 100%;
`

export const Action = styled.li`
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

export const Button = styled.button`
width: 4rem;
height: 4rem;
background-color: #2F2F2F;
border-radius: 50%;
padding:18%;
margin-bottom: 1rem;
cursor: pointer;
`