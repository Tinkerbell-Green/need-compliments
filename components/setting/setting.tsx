import React from "react";
import * as S from "./setting.styled";
import {SliderSwitch} from "./sliderSwitch";
import {SubHeadingButton} from "components/subHeading/subHeadingButton";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";

type SettingProps = {
  email: string;
  profile: string;
  id: string;
};

export const Setting = ({email, profile}: SettingProps) => {
  return (
    <S.InfoList>
      <S.InfoListItemEmail>
        <SubHeadingSpan>연동된 이메일</SubHeadingSpan>
        <S.email>{email}</S.email>
      </S.InfoListItemEmail>

      <S.InfoListItem>
        <SubHeadingButton>프로필</SubHeadingButton>
        <S.name>{profile}</S.name>
      </S.InfoListItem>

      <S.InfoListItem>
        <SubHeadingSpan>이메일로 검색 허용</SubHeadingSpan>
        <SliderSwitch />
      </S.InfoListItem>

      <S.InfoListItem>
        <SubHeadingButton>로그아웃</SubHeadingButton>
      </S.InfoListItem>

      <S.InfoListItem>
        <SubHeadingButton status={"error"}>계정 삭제하기</SubHeadingButton>
      </S.InfoListItem>
    </S.InfoList>
  );
};
