import {useSession} from "next-auth/react"
import React, {ReactNode, useEffect} from "react"
import {useDispatch} from "react-redux"
import {DataActionType, useDataSaga} from "stores/data"
import {NavigationActionType, navigationActionCreators} from "stores/navigation"
type UserProviderProps = {
  children: ReactNode
}
export const UserProvider = ({
  children
}: UserProviderProps) => {
  const dispatch = useDispatch()
  const {data: session, status} = useSession()
  console.log("userprovider", session, status);
  const {fetch} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA)

  const sessionUserId = ((session?.user || {}) as any).id as string

  useEffect(()=>{
    if (status === "authenticated" && sessionUserId){
      dispatch(navigationActionCreators[NavigationActionType.SET_USER_ID]({
        key: "loggedInUserId",
        userId: sessionUserId
      }))
  
      // TODO: move this to query param logic later
      dispatch(navigationActionCreators[NavigationActionType.SET_USER_ID]({
        key: "pageAuthorId",
        userId: sessionUserId
      }))
    }
  }, [dispatch, sessionUserId, status])
  useEffect(()=>{
    if (status === "authenticated" && sessionUserId){
      fetch({
        id: sessionUserId,
        author: sessionUserId,
        email: session?.user?.email || undefined,
        name: session?.user?.name || undefined,
        image: session?.user?.image || undefined
      })
    }
  },[fetch, session?.user?.email, session?.user?.image, session?.user?.name, sessionUserId, status])

  return (<>{children}</>)
}