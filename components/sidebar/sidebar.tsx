import {Menu,Save} from "@styled-icons/entypo"
import React, {MouseEventHandler, useState} from "react"
import * as S from "./sidebar.styled";

type OnClick = (event:Event) => void;

export const Sidebar = () => {
  const [menuHidden,setMenuHidden] = useState(true);

  const handleHiddenMenu = (event?:Event)=>{
    if(event && event.target !== event.currentTarget) return;
    setMenuHidden(!menuHidden);
  }

  return <>
    { menuHidden ? 
      (<S.IconContainerList>
        <S.IconContainer onClick={()=>handleHiddenMenu(event)}>
          <Menu/>
        </S.IconContainer>
      </S.IconContainerList>) : 
      (<S.MenuOverlay onClick={()=>handleHiddenMenu(event)}>
        <S.MenuContents>
          <h4>menu1</h4>
          <h4>menu2</h4>
          <h4>menu3</h4>
        </S.MenuContents>
      </S.MenuOverlay>)
    }
  </>
}
