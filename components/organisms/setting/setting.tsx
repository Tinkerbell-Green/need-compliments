import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useCallback} from "react";
import {SliderSwitch} from "../../atoms/sliderSwitch";
import * as S from "./setting.styled";
import {SubHeadingButton} from "components/subHeading/subHeadingButton";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";
import {UserData} from "stores/data";

type SettingProps = {
  loggedInUser: UserData;
  onUpdate: (name: string) => void;
  onDelete: () => void;
};

export const Setting = ({loggedInUser, onUpdate, onDelete}: SettingProps) => {
  const router = useRouter();
  const onProfileClick = useCallback(() => {
    router.push(`/setting/profile?name=${loggedInUser.name}`);
  }, [router, loggedInUser]);

  const onDeleteClick = useCallback(() => {
    if (confirm("계정을 삭제할까요?")) {
      onDelete();
    }
  }, [onDelete]);

  const onSignout = useCallback(() => {
    signOut({callbackUrl: "/"});
  }, []);

  return (
    <S.InfoList>
      <S.InfoListItemEmail>
        <SubHeadingSpan>연동된 이메일</SubHeadingSpan>
        <S.email>{loggedInUser.email}</S.email>
      </S.InfoListItemEmail>

      <S.InfoListItem>
        <SubHeadingButton onClick={onProfileClick}>
          프로필
          <S.name>{loggedInUser.name}</S.name>
        </SubHeadingButton>
      </S.InfoListItem>

      <S.InfoListItem>
        <SubHeadingSpan>이메일로 검색 허용</SubHeadingSpan>
        <SliderSwitch />
      </S.InfoListItem>

      <S.InfoListItem>
        <SubHeadingButton onClick={onSignout}>로그아웃</SubHeadingButton>
      </S.InfoListItem>

      <S.InfoListItem>
        <S.DeleteAccount onClick={onDeleteClick}>계정 삭제하기</S.DeleteAccount>
      </S.InfoListItem>
    </S.InfoList>
  );
};
