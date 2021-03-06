import styled from "styled-components";

const DATE_FONT_SIZE=1.5;
const TITLE_FONT_SIZE=1;

export const Container = styled.section`
  font-family:monospace;
  width: 100%;
  padding: 20px 20px 0 20px;
  padding-bottom: 0;
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

export const Title = styled.header`
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
  height: fit-content;
  margin-bottom: 10px; 
	display: grid;
  grid-template-columns: repeat(7,1fr);
`;

export const Day = styled.li`
  font-size: ${DATE_FONT_SIZE}rem;
  text-transform: uppercase;
  >abbr{
    text-decoration: none;
    font-variant: none;
  }
`;

export const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(7,1fr);
`;
