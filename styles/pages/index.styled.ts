import styled from "styled-components";

const ICON_SIZE = 28;

export const IconList = styled.ul`
  align-items: flex-end;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const MenuIcon = styled.button`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:2px;
  margin: 0 8px;
  cursor: pointer;
`;

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

export const Profile = styled.div`
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${props => props.theme.colors["gray-200"]};
`;

export const SecondaryName = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  color: ${props => props.theme.colors["gray-200"]};
`;

export const Visible = styled.div`
display: flex;
flex-direction: row;

@media (max-width: ${props => props.theme.media.md}px) {
    flex-direction: column;
  }
`;
