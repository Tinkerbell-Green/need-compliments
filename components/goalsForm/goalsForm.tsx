import React from "react";
import { LayoutNavigation } from "components/layout-navigation";
import * as S from "./goalsForm.styled";

export const GoalsForm = () => (
  <LayoutNavigation title="목표" rightButtonText="확인">
    <S.DeleteButton>
      <span>삭제</span>
    </S.DeleteButton>
  </LayoutNavigation>
);
