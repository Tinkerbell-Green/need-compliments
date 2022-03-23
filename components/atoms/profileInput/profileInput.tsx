import React from "react";
import * as S from "./profileInput.styled";

type ProfileInputProps = {
  inputName: string;
  name: string;
};

const ProfileInput = ({inputName, name}: ProfileInputProps) => (
  <S.InputContainer>
    <S.InputName>{inputName}</S.InputName>
    <S.Input defaultValue={name} disabled></S.Input>
  </S.InputContainer>
);

export default ProfileInput;
