import React from "react";
import * as S from "../sidebar.styled";
import {UserInfo} from "pages";

type ProfileProps = UserInfo & {
  onFriendClick : () => void;
};

export const Profile = ({name, email, follwer, follwing, onFriendClick}: ProfileProps) => {
  return (
    <S.Profile>
      <S.Name>{name}</S.Name>
      <S.Email>{email}</S.Email>
      <S.FriendList onClick={()=>onFriendClick()}>
        <S.Friend>{`${follwer} 팔로워`}</S.Friend>
        <S.Friend>{`${follwing} 팔로워`}</S.Friend>
      </S.FriendList>
    </S.Profile>
  );
};
