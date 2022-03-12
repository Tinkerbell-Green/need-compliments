import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import styled from "styled-components";

function withIconStyles(icon: typeof BookClose) {
  return styled(icon)`
    > * {
      fill: gray;
    };
  `
}

export const GrayIcon = withIconStyles(BookClose);

export const Feed = styled.div`
  flex-direction: column;
`;

export const Header = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 15px;
`;

export const FeedContents = styled.ul`
  flex-direction: column;
`;

export const GoalAndInput = styled.li`
flex-direction: column;
margin-bottom: 20px;
`;