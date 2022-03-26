import {TargetEdit} from "@styled-icons/fluentui-system-filled";
import Link from "next/link";
import React, {useCallback,useMemo} from "react";
import * as S from "./sidebarSetting.styled";
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon";
import {IconSetting} from "components/moleculs/iconSetting"
import {Sidebar} from "components/moleculs/sidebar";
import {useDataSaga, DataActionType} from "stores/data";

type SidebarSettingProps = {
  onCloseMenu: React.MouseEventHandler,
  isMenuOpen:boolean;
  onSnackbarShow:()=>void,
}

export const SidebarSetting = ({
  onCloseMenu,
  isMenuOpen,
  onSnackbarShow,
}:SidebarSettingProps) => {
  const {
    data: loggedInUserData,
  } = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA);
  const {
    data: getGoalsData,
  } = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);

  const goals = useMemo(() => {
    const newGoals = getGoalsData || [];
    newGoals.sort((a, b) => a.createdAt - b.createdAt);
    return newGoals;
  }, [getGoalsData]);

  const handleFriendClick = useCallback(()=>{
    onSnackbarShow();
  },[onSnackbarShow]);

  return (
    <Sidebar onClose={onCloseMenu} isOpen={isMenuOpen}>
      <S.Header>
        <Link href={"/setting"} passHref={true}>
          <IconSetting rotate={true}/>
        </Link>
      </S.Header>
      <S.Profile>
        <S.Name>{loggedInUserData?.name}</S.Name>
        <S.Email>{loggedInUserData?.email}</S.Email>
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
