import type {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";
import {Seo} from "components/atoms/seo";
import {Goals} from "components/organisms/goals";
import {LayoutNavigation} from "components/templates/layout-navigation";

const GoalsPage: NextPage = () => {
  const router = useRouter();

  const onLeftButtonClick = () => {
    router.push("/");
  };

  const onRightButtonClick = () => {
    router.push("/goals/form");
  };

  return (
    <LayoutNavigation
      title="목표"
      rightButtonText="+"
      onLeftButtonClick={onLeftButtonClick}
      onRightButtonClick={onRightButtonClick}
    >
      <Seo title={"목표 설정"}></Seo>
      <Goals></Goals>
    </LayoutNavigation>
  );
};

export default GoalsPage;
