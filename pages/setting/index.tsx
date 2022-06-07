import type {NextPage} from "next";
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {Seo} from "components/atoms/seo";
import {Setting} from "components/organisms/setting";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";
import {RootState} from "stores/reducers";

const SettingPage: NextPage = () => {
  const loggedInUserId = useSelector(
    (state: RootState) => state.navigation.loggedInUserId
  );
  const {data: loggedInUserData, refetch: getLoggedInUserDataRefetch} =
    useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(
      DataActionType.GET_LOGGED_IN_USER_DATA,
      []
    );

  const onSucceed = useCallback(() => {
    getLoggedInUserDataRefetch();
  }, [getLoggedInUserDataRefetch]);
  const {fetch: updateUserFetch, status: updateUserStatus} =
    useDataSaga<DataActionType.UPDATE_USER>(DataActionType.UPDATE_USER, [], {
      onSucceed
    });
  const {fetch: deleteUserFetch, status: deleteUserStatus} =
    useDataSaga<DataActionType.DELETE_USER>(DataActionType.DELETE_USER, []);

  const handleUpdate = useCallback(
    (name: string) => {
      if (!loggedInUserId) return;

      updateUserFetch({
        id: loggedInUserId,
        input: {
          name,
        },
      });
    },
    [loggedInUserId, updateUserFetch]
  );

  const handleDelete = useCallback(() => {
    if (!loggedInUserId) return;

    deleteUserFetch({
      id: loggedInUserId
    });
  }, [loggedInUserId, deleteUserFetch]);

  useEffect(() => {
    if (deleteUserStatus === DataSagaStatus.SUCCEEDED) {
      signOut({callbackUrl: "/"});
    }
  }, [deleteUserStatus]);

  const router = useRouter();

  const onLeftButtonClick = () => {
    router.push("/");
  };

  return (
    <LayoutNavigation>
      <Seo title={"설정"}></Seo>
      {loggedInUserData && (
        <Setting
          loggedInUser={loggedInUserData.user}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </LayoutNavigation>
  );
};

export default SettingPage;
