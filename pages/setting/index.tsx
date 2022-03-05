import type { NextPage } from "next";
import React from "react";
import { LayoutNavigation } from "components/layout-navigation";
import { useRouter } from "next/router";
import Setting from "components/setting/setting";

const SettingPage: NextPage = () => {
  const router = useRouter();

  const onLeftButtonClick = () => {
    router.push("/");
  };

  return (
    <LayoutNavigation title={"계정"} onLeftButtonClick={onLeftButtonClick}>
      <Setting />
    </LayoutNavigation>
  );
};

export default SettingPage;
