import {Settings} from "@styled-icons/feather";
import {KeyboardArrowRight} from "@styled-icons/material-twotone";
import {useRouter} from "next/router";
import React, {useCallback} from "react";
import {Profile} from "./profile"
import * as S from "./sidebar.styled";
import {Chip} from "components/chip";
import {ExpandedUserData,ExpandedGoalData} from "pages";

type SidebarProps = ExpandedUserData & {
  onCloseMenu: React.MouseEventHandler;
  isMenuOpen:boolean;
  goals: ExpandedGoalData[];
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
          <S.SettingIcon>
            <Settings onClick={handleSettingClick}/>
          </S.SettingIcon>
        </S.Header>
        <Profile
          name={name}
          email={email} 
          follwersCount={follwersCount} 
          follwingsCount={follwingsCount}
          onFriendClick={handleFriendClick}/>
        <S.Goals>
          <S.GoalsTitle onClick={handleGoalsTitleClick}>목표
            <S.ArrowIcon><KeyboardArrowRight/></S.ArrowIcon>
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
