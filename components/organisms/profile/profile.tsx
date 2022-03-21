import React from "react";
import * as S from "./profile.styled";
import ProfileInput from "components/atoms/profileInput/profileInput";

type ProfileProps = {
  name: string;
};

export const Profile = ({name}: ProfileProps) => (
  <>
    <S.ImageContainer>img</S.ImageContainer>
    <ProfileInput inputName={"이름"} name={name}></ProfileInput>
  </>
);
