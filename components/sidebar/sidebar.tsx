import {Settings} from "@styled-icons/feather";
import {KeyboardArrowRight} from "@styled-icons/material-twotone";
import {useRouter} from "next/router";
import React, {useCallback} from "react";
import {Profile} from "./profile"
import * as S from "./sidebar.styled";
import {Chip} from "components/chip";
import {UserInfo} from "pages";

type SidebarProps = UserInfo & {
  onCloseMenu: React.MouseEventHandler;
  isMenuOpen:boolean;
  goals: string[];
  goalsColor: string[];
}

export const Sidebar = ({
  name,
  email,
  follwer,
  follwing,
  onCloseMenu,
  isMenuOpen,
  goals,
  goalsColor
}:SidebarProps) => {
  const router = useRouter();
  
  const handleGoalsTitleClick = useCallback(()=>{
    router.push("/goal");
  },[router]);
  
  const handleFriendClick = useCallback(()=>{
    router.push("/explore");
  },[router]);
  
  const handleSettingClick = useCallback(()=>{
    router.push("/setting");
  },[router]);

  return (
    <S.MenuOverlay
      onClick={onCloseMenu} 
      className={`menuClose ${isMenuOpen ? "show" : "hidden"}`}>
      <S.MenuContents className={`modalClose ${isMenuOpen ? "show" : "hidden"}`}>
        <S.Header>
          <S.SettingIcon>
            <Settings onClick={handleSettingClick}/>
          </S.SettingIcon>
        </S.Header>
        <Profile
          name={name}
          email={email} 
          follwer={follwer} 
          follwing={follwing}
          onFriendClick={handleFriendClick}/>
        <S.Goals>
          <S.GoalsTitle onClick={handleGoalsTitleClick}>목표
            <S.ArrowIcon><KeyboardArrowRight/></S.ArrowIcon>
          </S.GoalsTitle>
          <S.GoalsContents>
            {goals.map((value,index)=>(
              <Chip 
                key={index}
                label={value}
                color={goalsColor[index]}>
              </Chip>
            ))}
          </S.GoalsContents>
        </S.Goals>
      </S.MenuContents>
    </S.MenuOverlay>
  );
};
