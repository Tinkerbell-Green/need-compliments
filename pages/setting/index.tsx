import type {NextPage} from "next";
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Setting} from "components/setting";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";
import {RootState} from "stores/reducers";

const SettingPage: NextPage = () => {
  const loggedInUserId = useSelector(
    (state: RootState) => state.navigation.loggedInUserId
  );
  const {data: loggedInUserData} =
    useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(
      DataActionType.GET_LOGGED_IN_USER_DATA
    );
  const {fetch: deleteUserFetch, status: deleteUserStatus} =
    useDataSaga<DataActionType.DELETE_USER>(DataActionType.DELETE_USER);

  useEffect(() => {
    if (deleteUserStatus === DataSagaStatus.SUCCEEDED) {
      signOut({callbackUrl: "/"});
    }
  }, [deleteUserStatus]);

  const handleDelete = useCallback(() => {
    if (!loggedInUserId) return;

    deleteUserFetch({
      pathSegments: [loggedInUserId],
    });
  }, [loggedInUserId, deleteUserFetch]);

  const router = useRouter();

  const onLeftButtonClick = () => {
    router.push("/");
  };

  return (
    <LayoutNavigation title={"계정"} onLeftButtonClick={onLeftButtonClick}>
      <Setting
        name={loggedInUserData?.name}
        email={loggedInUserData?.email}
        onDelete={handleDelete}
      />
    </LayoutNavigation>
  );
};

export default SettingPage;
