import styled from "styled-components";

export const DetailSection = styled.section`
  min-width: 350px;
  flex-direction: column;
  align-content: center;
  margin: 40px 0;
  padding: 0 20px;

@media (max-width: ${props => props.theme.media.md}px) {
    width: 100%;
  }
`;

export const Visible = styled.div`
display: flex;
flex-direction: row;

@media (max-width: ${props => props.theme.media.md}px) {
    flex-direction: column;
  }
`;
