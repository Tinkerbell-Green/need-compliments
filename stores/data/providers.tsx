import {useSession} from "next-auth/react"
import React, {ReactNode, useEffect} from "react"
import {useDispatch} from "react-redux"
import {useDataSaga} from "./hooks"
import {dataStore, navigationStore} from "stores"

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({
  children
}: UserProviderProps) => {
  const dispatch = useDispatch()
  const {data: session, status} = useSession()
  const {fetch} = useDataSaga<dataStore.ActionType.GET_LOGGED_IN_USER_DATA>(dataStore.ActionType.GET_LOGGED_IN_USER_DATA)
  
  const sessionUserId = ((session?.user || {}) as any).id as string

  useEffect(()=>{
    if (status === "authenticated" && sessionUserId){
      dispatch(navigationStore.actionCreators[navigationStore.ActionType.SET_USER_ID]({
        key: "loggedInUserId",
        userId: sessionUserId
      }))
  
      // TODO: move this to query param logic later
      dispatch(navigationStore.actionCreators[navigationStore.ActionType.SET_USER_ID]({
        key: "pageAuthorId",
        userId: sessionUserId
      }))
    }
  }, [dispatch, sessionUserId, status])

  useEffect(()=>{
    if (status === "authenticated" && sessionUserId){
      // TODO:
      // fetch({
      //   id: sessionUserId,
      //   author: sessionUserId,
      //   email: session.user?.email || undefined,
      //   name: session.user?.name || undefined,
      //   image: session.user?.image || undefined
      // })
    }
  },[fetch, session?.user?.email, session?.user?.image, session?.user?.name, sessionUserId, status])

  return (<>
    {children}
  </>)
}