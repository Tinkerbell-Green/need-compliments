import styled from "styled-components";
import {GoalColor} from "stores/data";

const TODAY_CIRCLE_SIZE = 1.8;
const EMOJI_SIZE=14;

export const Date = styled.button<{isPickedDate:boolean}>`
display: flex;
flex-direction: column;
height:110px;
padding: 3px;
overflow:hidden;
cursor: pointer;
transition: all 0.2s;
&:hover, &:focus{
  transform: translateY(-5%) scale(1.1);
}
@media (max-width: ${props => props.theme.media.md}px){
  height:80px;
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
flex-direction: row;
flex-wrap: wrap;
margin-top: 5px;
`;

export const Emoji = styled.div<{color:GoalColor}>`
width: ${EMOJI_SIZE}px;
height: ${EMOJI_SIZE}px;
margin:1px;
color:${props => props.theme.colors.goals[props.color]};
`;
