import styled from "styled-components"

export const Background = styled.section<{isOpen:boolean}>`
position: fixed;
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

visibility: ${props=>props.isOpen ? "visible" : "hidden"};
opacity: ${props=>props.isOpen ? 1 : 0};
`

export const Modal = styled.div<{isOpen:boolean}>`
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

visibility: ${props=>props.isOpen ? "visible" : "hidden"};
transform: ${props=>props.isOpen ? "translateY(0)" : "translateY(10%);"};
`
export const CloseButton = styled.button`
position: absolute;
top:0;
left:100%;
transform: translateX(-100%);
width: 28px;
height:28px;
color: ${props => props.theme.colors["gray-800"]}
`;