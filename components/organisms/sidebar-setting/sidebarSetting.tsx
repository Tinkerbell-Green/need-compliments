import {CloseOutline} from "@styled-icons/evaicons-outline";
import {Settings} from "@styled-icons/feather";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react";
import {Profile} from "./profile"
import * as S from "./sidebarSetting.styled";
import {Chip} from "components/atoms/chip";
import {Snackbar} from "components/atoms/snackbar";
import {Sidebar} from "components/moleculs/sidebar";
import {ExpandedUserData} from "pages";
import {GoalData} from "stores/data";

type SidebarSettingProps = ExpandedUserData & {
  onCloseMenu: React.MouseEventHandler,
  isMenuOpen:boolean;
  goals: GoalData[];
}

export const SidebarSetting = ({
  name,
  email,
  follwersCount,
  follwingsCount,
  onCloseMenu,
  isMenuOpen,
  goals,
}:SidebarSettingProps) => {
  const router = useRouter();
  const [isSnackbarShow, setIsSnackbarShow] = useState(false);
  
  const handleFriendClick = useCallback(()=>{
    setIsSnackbarShow(true);
  },[]);

  const handleSnackbarClose = useCallback(()=>{
    setIsSnackbarShow(false);
  },[])

  return (<>
    <Snackbar 
      visible={isSnackbarShow}
      onClose={handleSnackbarClose}
      message={"준비 중인 기능입니다. 그동안 캘린더를 채워보는건 어떨까요? 🧚‍♀️"}
      duration={5000}>
    </Snackbar>
    <Sidebar isOpen={isMenuOpen} onClose={onCloseMenu}>
      <S.Header>
        <S.CloseButton onClick={onCloseMenu}><CloseOutline/></S.CloseButton>
        <Link href={"/setting"} passHref>
          <S.SettingIcon><Settings/></S.SettingIcon>
        </Link>
      </S.Header>
      <Profile
        name={name}
        email={email}
        follwersCount={follwersCount} 
        follwingsCount={follwingsCount}
        onFriendClick={handleFriendClick}/>
      <Link href={"/goals"} passHref>
        <S.Goals>
          <S.GoalsTitle>목표 관리</S.GoalsTitle>
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
      </Link>
    </Sidebar>
  </>
  );
};
