import styled,{keyframes, css} from "styled-components";

export const Container = styled.section<{color:string,isVisible:boolean}>`
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

visibility: ${props=>props.isVisible ? "visible" : "hidden"};
transform: ${props=>props.isVisible ? "translate(-50%, -50%);" : "translate(-50%, -300%);"};
`;

export const Icon = styled.div`
width: 22px;
height:22px;
margin: 0 5px;
`;

export const Label = styled.p`
margin: 0 5px;
`;

export const Button = styled.button`
width: 22px;
height:22px;
padding:0;
margin: 0 5px;
border-radius: 50%;
cursor: pointer;
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


