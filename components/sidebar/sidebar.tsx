import {Settings, User} from "@styled-icons/feather";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {Profile} from "./profile"
import * as S from "./sidebar.styled";
import {UserInfo} from "pages";

type SidebarProps = UserInfo & {
  onMenuClick: React.MouseEventHandler;
  isMenuOpen:boolean;
  goalList: string[];
}

export const Sidebar = ({
  name,
  email,
  follwer,
  follwing,
  onMenuClick,
  isMenuOpen,
  goalList
}:SidebarProps) => {
  const router = useRouter();
  
  const handleGoalListTitleClick = ()=>{
    router.push("/goal");
  }

  const handleFriendClick = ()=>{
    router.push("/explore");
  }

  const handleSettingClick = ()=>{
    router.push("/setting");
  }

  return (
    <S.MenuOverlay
      onClick={onMenuClick} 
      className={isMenuOpen ? "show":"hidden"}>
      <S.MenuContents className={isMenuOpen ? "show": "hidden"}>
        <S.SettingIcon>
          <Settings onClick={handleSettingClick}/>
        </S.SettingIcon>
        <Profile
          name={name}
          email={email} 
          follwer={follwer} 
          follwing={follwing}
          onFriendClick={handleFriendClick} />
        <S.GoalList>
          <S.GoalListTitle onClick={()=>handleGoalListTitleClick()}>목표
            <span>{">"}</span>
          </S.GoalListTitle>
          {goalList.map((value,index)=>(
            <S.GoalListItem key={index}>{value}</S.GoalListItem>
          ))}
        </S.GoalList>
      </S.MenuContents>
    </S.MenuOverlay>
  );
};
