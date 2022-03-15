import {LayoutNavigation} from "components/layout-navigation";
import type {NextPage} from "next"
import React, {useCallback, useEffect} from "react"
import {useSelector} from "react-redux";
import * as S from "./index.styled";
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";
import {RootState} from "stores/reducers";

const TestUserPage: NextPage = () => {
  const loggedInUserId = useSelector((state: RootState)=>state.navigation.loggedInUserId)
  const {data: loggedInUserData, refetch: getLoggedInUserDataRefetch} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA)

  const onSucceed = useCallback(()=>{
    getLoggedInUserDataRefetch()
  },[getLoggedInUserDataRefetch])
  const {fetch: updateUserFetch, status: updateUserStatus} = useDataSaga<DataActionType.UPDATE_USER>(DataActionType.UPDATE_USER, {onSucceed})

  const handleUpdate = useCallback(()=>{
    if (!loggedInUserId) return;

    updateUserFetch({
      pathSegments: [loggedInUserId],
      data: {
        name: new Date().getSeconds().toString(),
      }
    })
  },[loggedInUserId, updateUserFetch])

  const handleLeftButtonClick = useCallback(()=>{
  },[])

  return (
    <LayoutNavigation
      rightButtonText={"?"}
      title="test goals"
      onLeftButtonClick={handleLeftButtonClick}
    >
      <S.Button onClick={handleUpdate}>UPDATE</S.Button>

      <div>
        <div>{loggedInUserData?.name}</div>
      </div>
    </LayoutNavigation>   
  )
}

export default TestUserPage