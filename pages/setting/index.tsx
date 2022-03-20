import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {Setting} from "components/setting";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType} from "stores/data";

const SettingPage: NextPage = () => {
  const {data: loggedInUserData} =
    useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(
      DataActionType.GET_LOGGED_IN_USER_DATA
    );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (loggedInUserData) {
      setName(loggedInUserData.name);
      setEmail(loggedInUserData.email);
    }
  }, [loggedInUserData]);

  const onLeftButtonClick = () => {
    router.push("/");
  };

  return (
    <LayoutNavigation title={"계정"} onLeftButtonClick={onLeftButtonClick}>
      <Setting name={loggedInUserData?.name} email={loggedInUserData?.email} />
    </LayoutNavigation>
  );
};

export default SettingPage;
