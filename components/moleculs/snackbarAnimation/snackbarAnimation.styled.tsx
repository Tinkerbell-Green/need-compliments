import styled from "styled-components";

export const Snackbarify = styled.div<{isVisible:boolean}>`
z-index:10;
position: fixed;
top: 20px;
left: 50%;
transition: all 0.4s ease-out;
opacity: ${props=>props.isVisible ? "1" : "0"};
transform: ${props=>props.isVisible ? "translate(-50%, 0%);" : "translate(-50%, -300%);"};
`