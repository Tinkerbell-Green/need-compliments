import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { GoalsForm } from "components/goalsForm";
import { LayoutNavigation } from "components/layout-navigation";
import * as S from "../../../components/goalsForm/goalsForm.styled";

const GoalsFormPage: NextPage = () => {
  const router = useRouter();

  const onLeftButtonClick = () => {
    router.push("/goals");
  };

  return (
    <>
      <LayoutNavigation
        title="목표"
        rightButtonText="확인"
        onLeftButtonClick={onLeftButtonClick}
      >
        <GoalsForm></GoalsForm>;
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
