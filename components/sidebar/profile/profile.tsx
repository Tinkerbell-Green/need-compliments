import React from "react";
import * as S from "../sidebar.styled";
import {UserInfo} from "pages";

type ProfileProps = UserInfo & {
  onFriendClick : () => void;
};

export const Profile = ({name, email, follwersCount, follwingsCount, onFriendClick}: ProfileProps) => {
  return (
    <S.Profile>
      <S.Name>{name}</S.Name>
      <S.Email>{email}</S.Email>
      <S.FriendList onClick={()=>onFriendClick()}>
        <S.Friend>{`${follwersCount} 팔로워`}</S.Friend>
        <S.Friend>{`${follwingsCount} 팔로워`}</S.Friend>
      </S.FriendList>
    </S.Profile>
  );
};
