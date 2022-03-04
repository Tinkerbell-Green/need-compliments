import styled from "styled-components";

const MEDIUM_ICON_SIZE = 28;
const SMALL_ICON_SIZE = 18;

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
  width:${MEDIUM_ICON_SIZE}px;
  height:${MEDIUM_ICON_SIZE}px;
  padding:2px;
  margin: 0 8px;
  cursor: pointer;
`;

export const PublicScopeIcon = styled.div`
  width:${SMALL_ICON_SIZE}px;
  height:${SMALL_ICON_SIZE}px;
`;

export const AddIcon = styled(PublicScopeIcon)`
  cursor: pointer;
`;

export const Container = styled.div`
  max-width: 280px;
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
  margin-bottom: 14px;
`;
export const SubName = styled.div`
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



