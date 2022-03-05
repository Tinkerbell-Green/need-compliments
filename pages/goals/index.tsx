import { LayoutNavigation } from "components/layout-navigation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

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
      Goal입니다
    </LayoutNavigation>
  );
};

export default GoalsPage;
