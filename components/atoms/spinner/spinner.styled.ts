import styled,{keyframes, css} from "styled-components";

export const Container = styled.div`
display:flex;
flex-direction: column;
align-items: center;
`;

const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`
const spinStyled = css`
animation: ${spin} 800ms linear infinite;
`;

export const Spinner = styled.div<{color:string,size:number}>`
  width: ${props => props.size}px;
	height: ${props => props.size}px;
	margin-bottom: 10px;
	border-radius: 50%;
	border: 5px solid gray;
	border-top: 5px solid ${props => props.color};
	${spinStyled}
`;