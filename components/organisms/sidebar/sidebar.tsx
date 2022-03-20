import {Settings} from "@styled-icons/feather";
import {KeyboardArrowRight} from "@styled-icons/material-twotone";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react";
import {Profile} from "./profile"
import * as S from "./sidebar.styled";
import {Chip} from "components/atoms/chip";
import {Snackbar} from "components/atoms/snackbar";
import {ExpandedUserData} from "pages";
import {GoalData} from "stores/data";

type SidebarProps = ExpandedUserData & {
  onCloseMenu: React.MouseEventHandler;
  isMenuOpen:boolean;
  goals: GoalData[];
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
  const [isSnackbarShow, setIsSnackbarShow] = useState(false);
  
  const handleGoalsTitleClick = useCallback(()=>{
    router.push("/goals");
  },[router]);
  
  const handleFriendClick = useCallback(()=>{
    // router.push("/explore");
    setIsSnackbarShow(true);
  },[]);
  
  const handleSettingClick = useCallback(()=>{
    router.push("/setting");
  },[]);

  const handleSnackbarClose = useCallback(()=>{
    setIsSnackbarShow(false);
  },[])

  return (<>
    <Snackbar 
      visible={isSnackbarShow}
      onClose={handleSnackbarClose}
      label={"준비 중인 기능입니다. 곧 만나요!"}>
    </Snackbar>
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
  </>
  );
};
