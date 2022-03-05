import React from "react";
import * as S from "./setting.styled";
import { SliderSwitch } from "./sliderSwitch";

type SettingProps = {
  email: string;
  profile: string;
  id: string;
};

export const Setting = ({ email, profile, id }: SettingProps) => {
  return (
    <S.InfoList>
      <S.InfoListItemEmail>
        <S.SubHeading>연동된 이메일</S.SubHeading>
        <S.email>{email}</S.email>
      </S.InfoListItemEmail>

      <S.InfoListItem>
        <S.SubHeading>프로필</S.SubHeading>
        <S.name>{profile}</S.name>
      </S.InfoListItem>

      <S.InfoListItem>
        <S.SubHeading>사용자 아이디</S.SubHeading>
        <S.name>{id}</S.name>
      </S.InfoListItem>

      <S.InfoListItem>
        <S.SubHeading>이메일 변경</S.SubHeading>
      </S.InfoListItem>

      <S.InfoListItem>
        <S.SubHeading>비밀번호 재설정</S.SubHeading>
      </S.InfoListItem>

      <S.InfoListItem>
        <S.SubHeading>이메일로 검색 허용</S.SubHeading>
        <SliderSwitch />
      </S.InfoListItem>

      <S.InfoListItem>
        <S.SubHeading>둘러보기에 나타나기</S.SubHeading>
        <SliderSwitch />
      </S.InfoListItem>

      <S.InfoListItem>
        <S.SubHeading>로그아웃</S.SubHeading>
      </S.InfoListItem>

      <S.InfoListItem>
        <S.DeleteAccount>계정 삭제하기</S.DeleteAccount>
      </S.InfoListItem>
    </S.InfoList>
  );
};
