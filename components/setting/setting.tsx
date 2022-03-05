import React from "react";
import * as S from "./setting.styled";
import { SliderSwitch } from "./sliderSwitch";

export const Setting = () => {
  return (
    <S.infoList>
      <S.infoListItem>
        <S.SubHeading>연동된 이메일</S.SubHeading>
        <S.email>ghdqlsdl9633@gmail.com</S.email>
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>프로필</S.SubHeading>
        <S.name>귀신</S.name>
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>사용자 아이디</S.SubHeading>
        <S.name>Hongbeen</S.name>
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>이메일 변경</S.SubHeading>
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>비밀번호 재설정</S.SubHeading>
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>이메일로 검색 허용</S.SubHeading>
        <SliderSwitch />
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>둘러보기에 나타나기</S.SubHeading>
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>로그아웃</S.SubHeading>
      </S.infoListItem>

      <S.infoListItem>
        <S.SubHeading>계정 삭제하기</S.SubHeading>
      </S.infoListItem>
    </S.infoList>
  );
};
