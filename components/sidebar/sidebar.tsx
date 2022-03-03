import {Settings,Menu, User} from "@styled-icons/feather";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {CategoryList} from "./category-list"
import {Profile} from "./profile"
import * as S from "./sidebar.styled";

export type UserInfo = {
  name : string,
  email : string,
  follwer: number,
  follwing : number,
}

export const Sidebar = () => {
  const router = useRouter();
  const [menuHidden, setMenuHidden] = useState(true);
  const [categories,setCategories] = useState(["Algorithm","Personal"]);
  const [userInfo, setUserInfo] = useState({
    name : "HongBeen Lee",
    email : "redbean-2@naver.com",
    follwer: 40,
    follwing :30
  });

  const handleHiddenMenu:React.MouseEventHandler = (event) => {
    if (event.target !== event.currentTarget) return;
    setMenuHidden(!menuHidden);
  };

  const handleCategoryTitleClick = ()=>{
    router.push("/goal");
  }

  const handleFriendClick = ()=>{
    router.push("/explore");
  }

  const handleSettingClick = ()=>{
    router.push("/setting");
  }

  return (
    <>
      <S.IconList>
        <S.MenuIcon>
          <Menu onClick={handleHiddenMenu} />
        </S.MenuIcon>
      </S.IconList>
      <S.MenuOverlay onClick={handleHiddenMenu} className={menuHidden ? "hidden" : "show"}>
        <S.MenuContents className={menuHidden ? "hidden" : "show"}>
          <S.SettingIcon>
            <Settings onClick={handleSettingClick}/>
          </S.SettingIcon>
          <Profile 
            name={userInfo.name} 
            email={userInfo.email} 
            follwer={userInfo.follwer} 
            follwing={userInfo.follwing}
            onFriendClick={handleFriendClick} />
          <CategoryList onTitleClick={handleCategoryTitleClick} categories={categories}/>
        </S.MenuContents>
      </S.MenuOverlay>
    </>
  );
};
