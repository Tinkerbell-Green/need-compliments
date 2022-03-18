import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback} from "react";
import {useState} from "react";
import * as S from "../../../components/organisms/goalsForm/goalsForm.styled";
import {GoalsForm} from "components/organisms/goalsForm";
import {LayoutNavigation} from "components/templates/layout-navigation";

const GoalsFormPage: NextPage = () => {
  const [isOnRightButtonClick, setIsOnRightButtonClick] =
    useState<boolean>(false);

  const router = useRouter();

  const onLeftButtonClick = useCallback(() => {
    router.push("/goals");
  }, [router]);

  const onRightButtonClick = useCallback(() => {
    router.push("/goals");
    setIsOnRightButtonClick(true);
  }, [router]);

  return (
    <>
      <LayoutNavigation
        title="목표"
        rightButtonText="확인"
        onLeftButtonClick={onLeftButtonClick}
        onRightButtonClick={onRightButtonClick}
      >
        <GoalsForm isOnRightButtonClick={isOnRightButtonClick}></GoalsForm>
      </LayoutNavigation>

      <S.DeleteButtonContainer>
        <S.DeleteButton>
          <span>삭제</span>
        </S.DeleteButton>
      </S.DeleteButtonContainer>
    </>
  );
};

export default GoalsFormPage;
