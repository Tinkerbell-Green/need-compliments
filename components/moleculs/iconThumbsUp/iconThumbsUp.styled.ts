import styled,{keyframes,css} from "styled-components";

export const Icon = styled.div`
cursor:pointer;
transition: all 0.3s linear;
transform: scale(1);
&:hover, &:focus{
  color:rgba(150, 55, 255,0.8);
  transform: scale(1.1);
}
`;

const bubble = keyframes`
	0% {
    visibility: visible;
		transform:translate(-100%,0) scale(1);
	}
  50%{
    transform: translate(-100%, -100px) scale(1.8);
  }
	100% {
    visibility: hidden;
    opacity: 0;
		transform:translate(-100%, -200px) scale(3);
	}
`
const bubbleStyled = css`
animation: ${bubble} 750ms linear;
`;

export const Bubble = styled.div<{clicked: boolean}>`
  visibility: hidden;
  position: fixed;
  color:rgba(150, 55, 255,1);
  ${props => props.clicked && bubbleStyled};
`;

export const Bubble1 = styled(Bubble)`
`;
export const Bubble2 = styled(Bubble)`
animation-delay: 150ms;
`;
export const Bubble3 = styled(Bubble)`
animation-delay: 280ms;
`;
export const Bubble4 = styled(Bubble)`
animation-delay: 350ms;
`;
export const Bubble5 = styled(Bubble)`
animation-delay: 420ms;
`;