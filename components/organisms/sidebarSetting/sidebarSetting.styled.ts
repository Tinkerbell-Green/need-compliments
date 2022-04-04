import styled from "styled-components";

export const Header = styled.div`
  padding: 10px;
  justify-content: flex-end;
`;

export const Profile = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

export const Goals = styled.div`
  flex-direction: column;
`;

export const Title = styled.a`
  text-align: left;
  text-decoration: none;
  align-items: center;
  width:100%;
  font-size: 1rem;
  font-weight: 600;
  padding: 18px 20px;
  cursor: pointer;
`;

export const GoalsContents = styled.ul`
  width:100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 20px;
  > * {
    margin-top: 10px;
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

export const Name = styled.div`
  font-size: 1.125rem;
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
  font-weight: 500;
  cursor: pointer;
`;

export const Friend = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;
export const SettingIcon = styled.button`
  width:28px;
  height:28px;
  padding:2px;
  margin: 10px;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.3s ease-in-out;

  &:hover, &:focus{
    transform: rotate(90deg);
  }
`;