import styled,{css} from "styled-components";

export const Snackbarify = styled.div<{isVisible:boolean, transitionDuration:number}>`
z-index:10;
position: fixed;
top: 8%;
left: 50%;
transition: all ${props=>props.transitionDuration}ms ease-out;
${props => props.isVisible 
    ? css`
    opacity: 1;
    transform: translate(-50%, 0%);`
    : css`
    opacity: 0;
    transform: translate(-50%, -300%);`
};
`