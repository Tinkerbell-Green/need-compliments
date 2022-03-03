import React, {useState} from "react";
import * as S from "../sidebar.styled";

type ProfileProps = {
	name: string;
	email: string;
	follwer: number;
	follwing: number;
};

export const Profile = ({name, email, follwer, follwing}: ProfileProps) => {
  return (
    <S.Profile>
      <S.Name>{name}</S.Name>
      <S.Email>{email}</S.Email>
      <S.FriendList>
        <S.Friend>{`${follwer} 팔로워`}</S.Friend>
        <S.Friend>{`${follwing} 팔로워`}</S.Friend>
      </S.FriendList>
    </S.Profile>
  );
};
