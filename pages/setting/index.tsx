import type {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {Setting} from "components/setting";

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
