import styled from "styled-components";

const ICON_SIZE = 28;

export const IconList = styled.ul`
  position: absolute;
  top:0;
  left:100%;
  transform: translateX(-100%);
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const MenuIcon = styled.div`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:2px;
  margin: 0 8px;
  cursor: pointer;
`;

export const Container = styled.div`
  min-width: 380px;
  flex-direction: column;
  align-content: center;
  margin: 50px 10px;
`;

export const Profile = styled.div`
  flex-direction: column;
  margin: 30px 0;
`;

export const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;
export const SecondaryName = styled.div`
  font-size: 0.9rem;
`;

export const Feed = styled.div`
  flex-direction: column;
  > span {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 15px;
  }
`;



