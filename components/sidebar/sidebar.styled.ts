import styled from "styled-components";

const ICON_SIZE = 32;

export const Icon = styled.div`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:2px;
  cursor: pointer;
`;

export const SettingIcon = styled(Icon)`
  position: relative;
  top:0;
  left:100%;
  transform: translateX(-100%);
  padding: 10px 10px 0 0;
`;

export const MenuOverlay = styled.div`
  z-index: 10;
  position: fixed;
  top:0;
  left: 0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
  transition: all 0.2s ease-in-out;
  
  &.show{
    opacity: 1;
    visibility: visible;
  }
  &.hidden{
    visibility: hidden;
    opacity: 0;
  }
`;

export const MenuContents = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  top:0;
  left:100%;
  width: 280px;
  height:100%;
  background-color: ${props => props.theme.colors["gray-800"]};
  transition: all 0.2s ease-in-out;
  
  &.show{
    visibility: visible;
    transform:translateX(-100%);
  }
  &.hidden{
    visibility: hidden;
    transform: translateX(0%);
  }
`;

export const Profile = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const GoalList = styled.ul`
  padding: 0 20px;
`;

export const GoalListTitle = styled.div`
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  padding: 20px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
`;

export const GoalListItem = styled.li`
  width:fit-content;
  background-color: rgba(255,255,255,0.05);
  padding: 11px;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const Name = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const Email = styled.div`
  font-size: 0.8rem;
  margin-bottom: 20px;
`;

export const FriendList = styled.div`
  margin: 20px 0;
  cursor: pointer;
`;

export const Friend = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;