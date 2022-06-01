import styled from "styled-components";

export const Snackbarify = styled.div<{isVisible:boolean}>`
z-index:10;
position: fixed;
top: 8%;
left: 50%;
transition: all 0.4s ease-out;
visibility: ${props=>props.isVisible ? "visible" : "hidden"};
transform: ${props=>props.isVisible ? "translate(-50%, 0%);" : "translate(-50%, -300%);"};
`