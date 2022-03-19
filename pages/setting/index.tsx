import type {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";
import {Setting} from "components/setting";
import {LayoutNavigation} from "components/templates/layout-navigation";

const SettingPage: NextPage = () => {
  const router = useRouter();

  const onLeftButtonClick = () => {
    router.push("/");
  };

  return (
    <LayoutNavigation title={"계정"} onLeftButtonClick={onLeftButtonClick}>
      <Setting 
        id={"id"}
        profile={"profile"}
        email={"email"}
      />
    </LayoutNavigation>
  );
};

export default SettingPage;
