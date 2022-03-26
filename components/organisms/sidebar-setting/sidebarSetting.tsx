import {TargetEdit} from "@styled-icons/fluentui-system-filled";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useCallback} from "react";
import * as S from "./sidebarSetting.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon";
import {IconSetting} from "components/moleculs/iconSetting"
import {Sidebar} from "components/moleculs/sidebar";
import {ExpandedUserData} from "pages";
import {GoalData} from "stores/data";

type SidebarSettingProps = ExpandedUserData & {
  onCloseMenu: React.MouseEventHandler,
  isMenuOpen:boolean;
  goals: GoalData[];
  onSnackbarShow:()=>void,
}

export const SidebarSetting = ({
  name,
  email,
  follwersCount,
  follwingsCount,
  onCloseMenu,
  isMenuOpen,
  goals,
  onSnackbarShow,
}:SidebarSettingProps) => {
  const router = useRouter();
  
  const handleFriendClick = useCallback(()=>{
    onSnackbarShow();
  },[onSnackbarShow]);

  return (
    <Sidebar isOpen={isMenuOpen} onClose={onCloseMenu}>
      <S.Header>
        <Link href={"/setting"} passHref>
          <IconSetting rotate/>
        </Link>
      </S.Header>
      <S.Profile>
        <S.Name>{name}</S.Name>
        <S.Email>{email}</S.Email>
        <S.FriendList onClick={handleFriendClick}>
        칭필을 친구와 함께 사용할 수 있나요?
          {/* <S.Friend>{`${follwersCount} 팔로워`}</S.Friend> */}
          {/* <S.Friend>{`${follwingsCount} 팔로워`}</S.Friend> */}
        </S.FriendList>
      </S.Profile>
      <Link href={"/goals"} passHref>
        <S.Goals>
          <S.GoalsTitle>
            <Icon><TargetEdit/></Icon>
            <span>목표 관리</span>
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
      </Link>
    </Sidebar>
  );
};
