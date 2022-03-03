import {Settings,ChevronRight} from "@styled-icons/feather";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {Profile} from "./profile"
import * as S from "./sidebar.styled";
import {ListItemGoal} from "components/list-item-goal";
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
          <Settings onClick={handleSettingClick} size={24}/>
        </S.SettingIcon>
        <Profile
          name={name}
          email={email} 
          follwer={follwer} 
          follwing={follwing}
          onFriendClick={handleFriendClick}/>
        <S.GoalList>
          <S.Title onClick={()=>handleGoalListTitleClick()}>목표
            <S.Icon><ChevronRight size={20}/></S.Icon>
          </S.Title>
          {goalList.map((value,index)=>(
            <ListItemGoal key={index} textColor={"violet"}>
              {value}
            </ListItemGoal>
          ))}
        </S.GoalList>
      </S.MenuContents>
    </S.MenuOverlay>
  );
};
