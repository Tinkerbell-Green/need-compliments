import styled from "styled-components";

const TODAY_CIRCLE_SIZE = 1.8;
const EMOJI_SIZE=28;
const DATE_FONT_SIZE=1.5;
const TITLE_FONT_SIZE=1;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 800px;
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  height: fit-content;
  margin: 5px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Title = styled.div`
  font-size: ${TITLE_FONT_SIZE}rem;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Button = styled.button`
  width:20px;
  height:20px;
  padding:0;
  margin: 0 5px;
  cursor: pointer;
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
	flex-basis:90%;
  width: 100%;
  padding: 10px;
`;

export const Days = styled.ul`
  width: 100%;
  flex-basis: 10%;
	display: grid;
  grid-template-columns: repeat(7,1fr);
`;

export const Day = styled.li`
  font-size: ${DATE_FONT_SIZE}rem;
`;

export const Dates = styled.ul`
  flex-basis: 90%;
  display: grid;
  grid-template-columns: repeat(7,1fr);
`;

export const Date = styled.li`
  margin-bottom: 14px;
  cursor: pointer;
`

export const Today = styled.div`
  height: ${TODAY_CIRCLE_SIZE}rem;
  line-height: ${TODAY_CIRCLE_SIZE}rem;
  
  &.todayHighligh{
    justify-content: center;
    position: sticky;
    border-radius: 50%;
    border: 1px solid;
    width: ${TODAY_CIRCLE_SIZE}rem;
    }
`;
export const DateNumber = styled.div``;

export const DateEmoji = styled.div`
  font-size: ${EMOJI_SIZE}px;
`;