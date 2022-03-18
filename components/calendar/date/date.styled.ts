import styled from "styled-components";

const TODAY_CIRCLE_SIZE = 1.8;
const EMOJI_SIZE=24;

export const Date = styled.button<{isPickedDate:boolean}>`
display: flex;
flex-direction: column;
height:110px;
padding: 3px;
overflow-y: hidden;
cursor: pointer;
transition: all 0.2s;
&:hover, &:focus{
  transform: translateY(-5%) scale(1.1);
}`

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

export const Emoji = styled.li<{color:string,duration:number}>`
width: ${EMOJI_SIZE}px;
height: ${EMOJI_SIZE}px;
opacity: 0.8;
padding:1px;
color:${props => props.color};
`;
