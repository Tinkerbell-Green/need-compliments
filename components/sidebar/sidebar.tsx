import {Settings,Menu} from "@styled-icons/feather";
import React, {useState} from "react";
import {CategoryList} from "./category-list"
import {Profile} from "./profile"
import * as S from "./sidebar.styled";

export const Sidebar = () => {
  const [menuHidden, setMenuHidden] = useState(true);
  const [categories,setCategories] = useState(["Algorithm","Personal"]);

  const handleHiddenMenu:React.MouseEventHandler = (event) => {
    if (event.target !== event.currentTarget) return;
    setMenuHidden(!menuHidden);
  };

  return (
    <>
      <S.IconList>
        <S.MenuIcon>
          <Menu onClick={handleHiddenMenu} />
        </S.MenuIcon>
      </S.IconList>
      <S.MenuOverlay onClick={handleHiddenMenu} hidden={menuHidden}>
        <S.MenuContents>
          <S.SettingIcon>
            <Settings/>
          </S.SettingIcon>
          <Profile name={"HongBeen Lee"} email={"redbean-2@naver.com"} follwer={40} follwing={30}/>
          <CategoryList categories={categories}/>
        </S.MenuContents>
      </S.MenuOverlay>
    </>
  );
};
