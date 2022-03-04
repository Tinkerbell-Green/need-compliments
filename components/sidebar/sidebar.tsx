import {Settings} from "@styled-icons/feather";
import {useRouter} from "next/router";
import React, {useCallback} from "react";
import {Profile} from "./profile"
import * as S from "./sidebar.styled";
import {UserInfo} from "pages";

type SidebarProps = UserInfo & {
  onCloseMenu: React.MouseEventHandler;
  isMenuOpen:boolean;
  goalList: string[];
}

export const Sidebar = ({
  name,
  email,
  follwer,
  follwing,
  onCloseMenu,
  isMenuOpen,
  goalList
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
          onFriendClick={handleFriendClick} />
        <S.GoalList>
          <S.GoalListTitle onClick={handleGoalListTitleClick}>목표
            <span>{">"}</span>
          </S.GoalListTitle>
          {/* TODO: item 하나를 grayBox로 일반화 - 텍스트 기준 left,right 위치에 버튼추가할수있게 */}
          {goalList.map((value,index)=>(
            <S.GoalListItem key={index}>{value}</S.GoalListItem>
          ))}
        </S.GoalList>
      </S.MenuContents>
    </S.MenuOverlay>
  );
};
