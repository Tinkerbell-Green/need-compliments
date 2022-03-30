import styled,{keyframes, css} from "styled-components";

const ICON_NOTMAL_SIZE = 22;
const ICON_SAMLL_SIZE = 16;

export const Container = styled.button<{color:string,isVisible:boolean}>`
z-index:10;
position: fixed;
top: 8%;
left: 50%;
display: flex;
background-color: ${props => props.color};
border-radius: 4px;
align-items: center;
padding: 15px 10px;
transition: all 0.3s ease-out;
width:fit-content;
visibility: ${props=>props.isVisible ? "visible" : "hidden"};
transform: ${props=>props.isVisible ? "translate(-50%, -50%);" : "translate(-50%, -300%);"};
`;

export const Icon = styled.div`
width: ${ICON_NOTMAL_SIZE}px;
height:${ICON_NOTMAL_SIZE}px;
margin: 0 5px;

@media (max-width: ${props => props.theme.media.md}px) {
	width: ${ICON_NOTMAL_SIZE}px;
	height:${ICON_SAMLL_SIZE}px;
	margin: 0;
}
`;

export const Label = styled.p`
margin: 0 5px;
font-size: 14px;
@media (max-width: ${props => props.theme.media.md}px) {
	font-size: 12px;
}
`;

export const Button = styled.button`
width: ${ICON_NOTMAL_SIZE}px;
height:${ICON_NOTMAL_SIZE}px;
padding:0;
margin: 0 5px;
border-radius: 50%;
cursor: pointer;
@media (max-width: ${props => props.theme.media.md}px) {
	width: ${ICON_NOTMAL_SIZE}px;
	height:${ICON_SAMLL_SIZE}px;
	margin: 0;
}
`;

const progress = keyframes`
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-100%);
	}
`
const progressStyled = css`
animation: ${progress} linear;
`;

export const Progess = styled.div`
position: absolute;
top:0;
left:0;
width:100%;
height: 3px;
overflow: hidden;
`;

export const Bar = styled.div<{visible:boolean, duration:number}>`
width:100%;
height: 100%;
border-top-left-radius: 4px;
border-top-right-radius: 4px;
background-color: ${props => props.theme.colors["gray-100"]};
${props => props.visible && progressStyled}
animation-duration: ${props => props.duration}ms;
`;


