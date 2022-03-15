import styled from "styled-components"

export const Background = styled.section<{isModalOpen:boolean}>`
position: absolute;
top:50%;
left:50%;
width:100%;
height:100%;
transform: translate(-50%,-50%);
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,0.5);
transition: all 350ms ease-in-out;

visibility: ${props=>props.isModalOpen ? "visible" : "hidden"};
opacity: ${props=>props.isModalOpen ? 1 : 0};
`

export const Modal = styled.div<{isModalOpen:boolean}>`
width:fit-content;
max-width: 300px;
height: fit-content;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 10px;
background-color: #212222;
padding:10px;
transition: all 350ms ease-in-out;

visibility: ${props=>props.isModalOpen ? "visible" : "hidden"};
transform: ${props=>props.isModalOpen ? "translateY(0)" : "translateY(10%);"};
`
