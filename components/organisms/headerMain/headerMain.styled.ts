import styled from "styled-components";
const ICON_SIZE = 28;

export const Header = styled.header`
width: 100%;
height: 70px;
display: flex;
align-items: center;
padding-top:10px;
border-bottom: 1px solid rgba(1,1,1,0.5);
`;

export const NavPart = styled.div`
align-items: center;
`;

export const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  align-items: center;
  > *{
    margin-left: 10px;
  }
`;

export const Profile = styled.div`
width:fit-content;
font-size:0.875rem;
`;

export const Img = styled.img`
border-radius: 50%;
height: 10px;
width:10px;
`;

export const NavItem = styled.div`
font-size: 1rem;
margin-right:5px;
border-radius: 3px;
cursor: pointer;
&:hover, &:focus{
  background-color: ${props => props.theme.colors["gray-600"]};
}
`;

export const Icon = styled.button`
  width:${ICON_SIZE}px;
  height:${ICON_SIZE}px;
  padding:2px;
  cursor: pointer;
`;

export const MenuIcon = styled(Icon)`
margin-right: 10px;
`;
