import {Settings,Menu} from "@styled-icons/feather";
import React, {useState} from "react";
import * as S from "./sidebar.styled";

export const Sidebar = () => {
  const [menuHidden, setMenuHidden] = useState(true);

  const handleHiddenMenu = (
    event: React.MouseEvent<HTMLElement> | React.MouseEvent<SVGSVGElement>
  ) => {
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
          <S.Profile>
            <S.Name>HongBeen Lee</S.Name>
            <S.Email>redbean-2@naver.com</S.Email>
            <S.FriendList>
              <S.Friend>{"2 팔로워"}</S.Friend>
              <S.Friend>{"2 팔로잉"}</S.Friend>
            </S.FriendList>
          </S.Profile>
          <S.CategoryList>
            <S.Title>목표</S.Title>
            <S.Category>Project</S.Category>
            <S.Category>Algorithm</S.Category>
          </S.CategoryList>
        </S.MenuContents>
      </S.MenuOverlay>
    </>
  );
};
