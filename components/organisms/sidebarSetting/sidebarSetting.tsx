import Link from "next/link";
import React, {useCallback,useMemo} from "react";
import * as S from "./sidebarSetting.styled";
import {Chip} from "components/atoms/chip";
import {Logo} from "components/atoms/logo";
import {IconSetting} from "components/moleculs/iconSetting"
import {Sidebar} from "components/moleculs/sidebar";
import {useDataSaga, DataActionType} from "stores/data";

type SidebarSettingProps = {
  onCloseMenu: React.MouseEventHandler,
  isMenuOpen:boolean;
}

export const SidebarSetting = ({
  onCloseMenu,
  isMenuOpen,
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
    //
  },[]);

  return (
    <Sidebar onClose={onCloseMenu} isOpen={isMenuOpen}>
      <S.Header>
        <Logo/>
        <Link href={"/setting"} passHref={true}>
          <a><IconSetting/></a>
        </Link>
      </S.Header>
      <S.Profile>
        <S.Name>{loggedInUserData?.name}</S.Name>
        <S.Email>{loggedInUserData?.email}</S.Email>
        {/* <S.FriendList onClick={handleFriendClick}>
          <S.Friend>{`${follwersCount} 팔로워`}</S.Friend>
          <S.Friend>{`${follwingsCount} 팔로워`}</S.Friend>
        </S.FriendList> */}
      </S.Profile>
      <Link href={"/"} passHref>
        <S.Title>내 피드</S.Title>
      </Link>
      <S.Goals>
        <Link href={"/goals"} passHref>
          <S.Title>목표</S.Title>
        </Link>
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
      
    </Sidebar>
  );
};
