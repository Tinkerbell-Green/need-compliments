import styled from "styled-components";
const ICON_SIZE = 28;

export const Header = styled.header`
width: 100%;
height: 70px;
display: flex;
align-items: center;
padding:10px 0;
background-color: ${props => props.theme.colors.black};
position: sticky; 
top:0;
z-index: 1;
`;

export const NavPart = styled.div`
align-items: center;
`;

export const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  align-items: center;
  > *{
    margin-left: 10px;
  }
`;

export const More = styled.div`
@media screen and (max-width: ${props => props.theme.media.md}px){
  visibility: hidden;
  width:0px;
}
`;

export const NavItem = styled.a`
text-decoration: none;
font-size: 1rem;
padding: 10px 20px;
border-radius: 3px;
color: ${props => props.theme.colors["gray-200"]};
cursor: pointer;

&:hover, &:focus,&.active{
  color: ${props => props.theme.colors.goals.mediunslateblue};
}
`;