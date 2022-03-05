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
  goalList: string[];
  goalListColor: string[];
}

export const Sidebar = ({
  name,
  email,
  follwer,
  follwing,
  onCloseMenu,
  isMenuOpen,
  goalList,
  goalListColor
}:SidebarProps) => {
  const router = useRouter();
  
  const handleGoalListTitleClick = useCallback(()=>{
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
          <S.GoalsTitle onClick={handleGoalListTitleClick}>목표
            <S.ArrowIcon><KeyboardArrowRight/></S.ArrowIcon>
          </S.GoalsTitle>
          <S.GoalsContents>
            {goalList.map((value,index)=>(
              <Chip 
                key={index}
                label={value}
                color={goalListColor[index]}>
              </Chip>
            ))}
          </S.GoalsContents>
        </S.Goals>
      </S.MenuContents>
    </S.MenuOverlay>
  );
};
