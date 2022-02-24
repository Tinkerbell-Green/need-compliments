import styled from "styled-components";

const TODAY_CIRCLE = 1.8;
const DAY_WIDTH = 100/7;
const EMOJI_SIZE=28;
const DATE_SIZE=24;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
	padding: 10px;
  width: 100%;
  flex-basis: 10%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
	flex-basis:90%;
  width: 100%;
  padding: 10px;
`;

export const Dates = styled.ul`
  width: 100%;
  flex-basis: 10%;
	display: grid;
  grid-template-columns: repeat(7,1fr);
`;

export const Date = styled.li`
  flex-basis: ${DAY_WIDTH}%;
  font-size: ${DATE_SIZE}px;
`;

export const Days = styled.ul`
  flex-basis: 90%;
  display: grid;
  grid-template-columns: repeat(7,1fr);
`;

export const Day = styled.li`
  margin-bottom: 14px;
`

export const Today = styled.div`
  height: ${TODAY_CIRCLE}rem;
  line-height: ${TODAY_CIRCLE}rem;
  
  &.highlight{
    justify-content: center;
    position: sticky;
    border-radius: 50%;
    border: 1px solid;
    width: ${TODAY_CIRCLE}rem;
    }
`;
export const DayNumber = styled.div``;

export const DayEmoji = styled.div`
  font-size: ${EMOJI_SIZE}px;
`;