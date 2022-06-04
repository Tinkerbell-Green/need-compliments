import styled,{css} from "styled-components";

export const SnackbarifyContainer = styled.div<{isVisible:boolean, transitionDuration:number}>`
z-index:10;
position: fixed;
top: 5%;
left: 50%;
transition: all ${props=>props.transitionDuration}ms ease-in-out;
${props => props.isVisible 
    ? css`
    opacity: 1;
    transform: translate(-50%, 0%);`
    : css`
    opacity: 0;
    transform: translate(-50%, -300%);`
};
`