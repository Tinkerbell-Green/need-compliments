import type {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";
import {Goals} from "components/goals";
import {LayoutNavigation} from "components/layout-navigation";

const GoalsPage: NextPage = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <LayoutNavigation
      title="목표"
      rightButtonText="+"
      onLeftButtonClick={onClick}
    >
      <Goals></Goals>
    </LayoutNavigation>
  );
};

export default GoalsPage;
