import type {NextPage} from "next"
import {signOut} from "next-auth/react"
import {useRouter} from "next/router";
import React, {useCallback, useEffect} from "react"
import {useSelector} from "react-redux";
import {LayoutNavigation} from "components/templates/layout-navigation";
import {useDataSaga, DataActionType, DataSagaStatus} from "stores/data";
import {RootState} from "stores/reducers";
import * as S from "styles/pages/test/user.styled";

const TestUserPage: NextPage = () => {
  const router = useRouter();
  const loggedInUserId = useSelector((state: RootState)=>state.navigation.loggedInUserId)
  const {data: loggedInUserData, refetch: getLoggedInUserDataRefetch} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA)

  const onSucceed = useCallback(()=>{
    getLoggedInUserDataRefetch()
  },[getLoggedInUserDataRefetch])
  const {fetch: updateUserFetch, status: updateUserStatus} = useDataSaga<DataActionType.UPDATE_USER>(DataActionType.UPDATE_USER, {onSucceed})
  const {fetch: deleteUserFetch, status: deleteUserStatus} = useDataSaga<DataActionType.DELETE_USER>(DataActionType.DELETE_USER)

  const handleUpdate = useCallback(()=>{
    if (!loggedInUserId) return;

    updateUserFetch({
      id: loggedInUserId,
      input: {
        name: new Date().getSeconds().toString(),
      }
    })
  },[loggedInUserId, updateUserFetch])

  const handleDelete = useCallback(()=>{
    if (!loggedInUserId) return;

    deleteUserFetch({
      id: loggedInUserId,
    })
    
  },[loggedInUserId, deleteUserFetch])

  useEffect(()=>{
    if(deleteUserStatus===DataSagaStatus.SUCCEEDED){
      signOut({callbackUrl: "/"});
    }
  },[deleteUserStatus])

  return (
    <LayoutNavigation>
      <div onClick={()=>router.push("/test/ssr")}>go to test/ssr</div>
      <S.Button onClick={handleUpdate}>UPDATE NAME</S.Button>
      <S.Button onClick={handleDelete}>DELETE</S.Button>

      <div>
        <div>{loggedInUserData?.user?.name}</div>
      </div>
    </LayoutNavigation>   
  )
}

export default TestUserPage