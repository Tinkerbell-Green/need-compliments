import styled,{keyframes,css} from "styled-components";

const TODAY_CIRCLE_SIZE = 1.8;
const EMOJI_SIZE=20;

export const Date = styled.li<{isPickedDate:boolean}>`
height:110px;
padding: 3px;
overflow-y: hidden;
cursor: pointer;
transition: all 0.2s;

&:hover, &:focus{
  transform: scale(1.1);
}
${props => props.isPickedDate && 
`border: 1px solid skyblue;
border-radius: 10px;`
}
`

export const Today = styled.div`
width: ${TODAY_CIRCLE_SIZE}rem;
height: ${TODAY_CIRCLE_SIZE}rem;
line-height: ${TODAY_CIRCLE_SIZE}rem;

&.todayHighligh{
  justify-content: center;
  position: sticky;
  border-radius: 50%;
  background-color: ${props => props.theme.colors["gray-700"]};
  }
`;
export const DateNumber = styled.div`
color: ${props => props.theme.colors["gray-300"]};
`;

export const EmojiList = styled.ul`
display: flex;
flex-wrap: wrap;
margin-top: 5px;
`;

const emojiFade = keyframes`
  0%{
    opacity: 1;
    transform: scale(1.1);
  }
  50%{
    opacity: 0.5;
    transform: scale(1);
  }
  100%{
    opacity: 1;
    transform: scale(1.1);
  }
`
const emojiStyles = css`
animation: ${emojiFade} ease-in-out infinite;
`;

export const Emoji = styled.li<{color:string,duration:number}>`
width: ${EMOJI_SIZE}px;
height: ${EMOJI_SIZE}px;
padding:1px;
color:${props => props.color};
${emojiStyles}
animation-duration: ${props => props.duration}s;
`;
