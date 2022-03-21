import type {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";
import {LayoutNavigation} from "components/templates/layout-navigation";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const onLeftButtonClick = () => {
    router.push("/setting");
  };

  return (
    <LayoutNavigation
      title="프로필"
      rightButtonText="확인"
      onLeftButtonClick={onLeftButtonClick}
    >
      {}
    </LayoutNavigation>
  );
};

export default ProfilePage;
