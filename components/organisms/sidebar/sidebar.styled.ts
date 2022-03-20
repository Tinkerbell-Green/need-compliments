import styled from "styled-components";

export const MenuOverlay = styled.div`
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
    opacity: 0;
    visibility: hidden;
  }
`;

export const Header = styled.div`
  justify-content: flex-end;
`;

export const SettingIcon = styled.button`
  width:28px;
  height:28px;
  padding:2px;
  margin: 10px;
  cursor: pointer;
`;

export const MenuContents = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  top:0;
  left:100%;
  width: 280px;
  height: 100%;
  background-color: #222222;
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

export const Goals = styled.button`
  flex-direction: column;
  padding: 0 20px;
  cursor: pointer;
`;

export const GoalsTitle = styled.div`
  text-align: left;
  width:100%;
  font-size: 1rem;
  font-weight: 500;
  padding: 20px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

export const GoalsContents = styled.ul`
  max-height: 400px;
  overflow-y: auto;
  > * {
    margin-bottom: 10px;
  }
  
  /* firefox */
  scrollbar-width: 4px;
  scrollbar-color: rgba(0,0,0,0.3);
  scrollbar-face-color: ${props=>props.theme.colors["gray-600"]};
  
  &::-webkit-scrollbar{
  /* safari, chrome */
  width: 4px;
  background: rgba(0,0,0,0.3);
  }
  ::-webkit-scrollbar-track {
    border-radius: 2px;
}
  &::-webkit-scrollbar-thumb{
  /* safari, chrome */
  background: ${props=>props.theme.colors["gray-600"]};
  }
`;

export const ArrowIcon=styled.div`
  width:20px;
  height:20px;
  cursor: pointer;
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

export const FriendList = styled.button`
  display: flex;
  margin: 20px 0;
  cursor: pointer;
`;

export const Friend = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;