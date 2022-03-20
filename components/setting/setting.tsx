import React from "react";
import * as S from "./setting.styled";
import {SliderSwitch} from "./sliderSwitch";
import {SubHeadingButton} from "components/subHeading/subHeadingButton";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";

type SettingProps = {
  name?: string;
  email?: string;
  onDelete: () => void;
};

export const Setting = ({name, email, onDelete}: SettingProps) => {
  const onDeleteClick = () => {
    if (confirm("계정을 삭제할까요?")) {
      onDelete();
    }
  };

  return (
    <S.InfoList>
      <S.InfoListItemEmail>
        <SubHeadingSpan>연동된 이메일</SubHeadingSpan>
        <S.email>{email}</S.email>
      </S.InfoListItemEmail>

      <S.InfoListItem>
        <SubHeadingButton>프로필</SubHeadingButton>
        <S.name>{name}</S.name>
      </S.InfoListItem>

      <S.InfoListItem>
        <SubHeadingSpan>이메일로 검색 허용</SubHeadingSpan>
        <SliderSwitch />
      </S.InfoListItem>

      <S.InfoListItem>
        <SubHeadingButton>로그아웃</SubHeadingButton>
      </S.InfoListItem>

      <S.InfoListItem>
        <S.DeleteAccount onClick={onDeleteClick}>계정 삭제하기</S.DeleteAccount>
      </S.InfoListItem>
    </S.InfoList>
  );
};
