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
animation: ${heartBeat} 1000ms linear;
`;

export const Icon = styled.span<{isVisible:boolean}>`
position: fixed;
top:50%;
left:50%;
width: 120px;
height: 120px;
font-size: 120px;
z-index: 2;
color: white;
visibility: hidden;
/* ${props => props.isVisible && css`
  ${heartBeatStyled};
`}; */
${heartBeatStyled}
`;