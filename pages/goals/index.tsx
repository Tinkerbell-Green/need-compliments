import type {NextPage} from "next";
import Link from "next/link";
import React from "react";
import {Seo} from "components/atoms/seo";
import {Goals} from "components/organisms/goals";
import * as S from "components/organisms/goalsForm/goalsForm.styled";
import {LayoutNavigation} from "components/templates/layout-navigation";

const GoalsPage: NextPage = () => {
  return (
    <>
      <LayoutNavigation>
        <Seo title={"목표 설정"}></Seo>
        <Goals></Goals>
      </LayoutNavigation>
      <Link href={"/goals/form"} passHref>
        <S.ButtonContainer>
          <S.Button>추가하기</S.Button>
        </S.ButtonContainer>
      </Link>
    </>
  );
};

export default GoalsPage;
