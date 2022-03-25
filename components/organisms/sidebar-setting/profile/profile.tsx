import React from "react";
import * as S from "../sidebarSetting.styled";
import {ExpandedUserData} from "pages";

type ProfileProps = ExpandedUserData & {
  onFriendClick : () => void;
};

export const Profile = ({
  name, 
  email,
  follwersCount, 
  follwingsCount, 
  onFriendClick}: ProfileProps) => {
  return (
    <S.Profile>
      <S.Name>{name}</S.Name>
      <S.Email>{email}</S.Email>
      <S.FriendList onClick={()=>onFriendClick()}>
        칭필을 친구와 함께 사용할 수 있나요?
        {/* <S.Friend>{`${follwersCount} 팔로워`}</S.Friend> */}
        {/* <S.Friend>{`${follwingsCount} 팔로워`}</S.Friend> */}
      </S.FriendList>
    </S.Profile>
  );
};
