import Link from "next/link";
import React, {useCallback,useEffect,useMemo} from "react";
import * as S from "./sidebarSetting.styled";
import {Chip} from "components/atoms/chip";
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
    fetch: getGoalsFetch,
    data: getGoalsData,
  } = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);
  
  const goals = useMemo(() => {
    return (getGoalsData?.goals || []).sort((a, b) => a.createdAt - b.createdAt);
  }, [getGoalsData]);

  const handleFriendClick = useCallback(()=>{
    //
  },[]);

  useEffect(()=>{
    getGoalsFetch({
      input: {}
    })
  },[getGoalsFetch])

  return (
    <Sidebar onClose={onCloseMenu} isOpen={isMenuOpen}>
      <S.Header>
        <Link href={"/setting"} passHref={true}>
          <a><IconSetting/></a>
        </Link>
      </S.Header>
      <S.Profile>
        <S.Name>{loggedInUserData?.user?.name}</S.Name>
        <S.Email>{loggedInUserData?.user?.email}</S.Email>
        {/* <S.FriendList onClick={handleFriendClick}>
          <S.Friend>{`${follwersCount} 팔로워`}</S.Friend>
          <S.Friend>{`${follwingsCount} 팔로워`}</S.Friend>
        </S.FriendList> */}
      </S.Profile>
      <Link href={"/feed"} passHref>
        <S.Title>내 피드</S.Title>
      </Link>
      <S.Goals>
        <Link href={"/goals"} passHref>
          <S.Title>목표</S.Title>
        </Link>
        <S.GoalsContents>
          {goals.map((value)=>(
            <Chip 
              key={value._id}
              label={value.name}
              color={value.color}>
            </Chip>
          ))}
        </S.GoalsContents>
      </S.Goals>
      
    </Sidebar>
  );
};
