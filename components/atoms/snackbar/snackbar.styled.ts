import styled,{keyframes, css} from "styled-components";

const ICON_NOTMAL_SIZE = 22;
const ICON_SAMLL_SIZE = 16;
const PROGRESS_HEIGHT="3px";
const BORDER_RADIUS="4px";

export const Container = styled.div<{color:string}>`
position: relative;
display: flex;
justify-content: space-between;
background-color: ${props => props.color};
border-radius: ${BORDER_RADIUS};
align-items: center;
padding: 15px 30px;
width:fit-content;
height:fit-content;
`;

export const Contents = styled.div`
align-items: center;
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

export const CloseButton = styled.button`
width: ${ICON_NOTMAL_SIZE}px;
height:${ICON_NOTMAL_SIZE}px;
position: absolute;
top: 3px;
right: 3px;
padding:0;
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
top:100%;
left:0;
width:100%;
transform: translateY(-${PROGRESS_HEIGHT});
height: ${PROGRESS_HEIGHT};
border-bottom-left-radius: ${BORDER_RADIUS};
border-bottom-right-radius: ${BORDER_RADIUS};
overflow: hidden;
`;

export const Bar = styled.div<{duration:number}>`
width:100%;
height: 100%;
background-color: ${props => props.theme.colors["gray-100"]};
${progressStyled};
animation-duration: ${props => props.duration}ms;
`;


