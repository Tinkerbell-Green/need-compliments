import styled,{keyframes,css} from "styled-components";

const heartBeat = keyframes`
	0% {
    opacity: 1;
    visibility: visible;
		transform: translate(-50%, -50%) scale(1.2);
	}
  20%{
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  90%{
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
	100% {
    transform: translate(-50%, -50%) scale(1);
    visibility: hidden;
    opacity: 0;
	}
`
const heartBeatStyled = css`
animation: ${heartBeat} 800ms linear;
`;

export const Icon = styled.span<{isVisible:boolean,color:string}>`
position: fixed;
top:50%;
left:50%;
width: 150px;
height: 150px;
font-size: 150px;
z-index: 2;
color: ${props => props.color};
visibility: hidden;
${props => props.isVisible && css`
  ${heartBeatStyled};
`};
`;