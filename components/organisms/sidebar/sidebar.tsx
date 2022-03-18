import {Settings} from "@styled-icons/feather";
import {KeyboardArrowRight} from "@styled-icons/material-twotone";
import {useRouter} from "next/router";
import React, {useCallback} from "react";
import {Profile} from "./profile"
import * as S from "./sidebar.styled";
import {Chip} from "components/atoms/chip";
import {ExpandedUserData,ReducedGoalData} from "pages";

type SidebarProps = ExpandedUserData & {
  onCloseMenu: React.MouseEventHandler;
  isMenuOpen:boolean;
  goals: ReducedGoalData[];
}

export const Sidebar = ({
  name,
  email,
  follwersCount,
  follwingsCount,
  onCloseMenu,
  isMenuOpen,
  goals,
}:SidebarProps) => {
  const router = useRouter();
  
  const handleGoalsTitleClick = useCallback(()=>{
    router.push("/goals");
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
          <S.SettingIcon onClick={handleSettingClick}>
            <Settings/>
          </S.SettingIcon>
        </S.Header>
        <Profile
          name={name}
          email={email} 
          follwersCount={follwersCount} 
          follwingsCount={follwingsCount}
          onFriendClick={handleFriendClick}/>
        <S.Goals onClick={handleGoalsTitleClick}>
          <S.GoalsTitle>목표
          </S.GoalsTitle>
          <S.GoalsContents>
            {goals.map((value)=>(
              <Chip 
                key={value.id}
                label={value.name}
                color={value.color}>
              </Chip>
            ))}
          </S.GoalsContents>
        </S.Goals>
      </S.MenuContents>
    </S.MenuOverlay>
  );
};
