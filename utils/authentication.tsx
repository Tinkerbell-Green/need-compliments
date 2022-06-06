import {Session} from "next-auth"
import {useSession} from "next-auth/react"
import React, {ReactNode, useEffect} from "react"
import {useDispatch} from "react-redux"
import {DataActionType, useDataSaga} from "stores/data"
import {NavigationActionType, navigationActionCreators} from "stores/navigation"

type AuthenticationProviderProps = {
  children: ReactNode
}

export const getSessionUserId = (session: Session | null) => {
  return ((session?.user || {}) as any).id as string
}

export const AuthenticationProvider = ({
  children
}: AuthenticationProviderProps) => {
  const dispatch = useDispatch()
  const {data: session, status} = useSession()
  const {fetch, data} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA)

  const sessionUserId = getSessionUserId(session)

  useEffect(()=>{
    if (status === "authenticated" && sessionUserId){
      dispatch(navigationActionCreators[NavigationActionType.SET_USER_ID]({
        key: "loggedInUserId",
        userId: sessionUserId
      }))
    }
  }, [sessionUserId, dispatch, status])
  
  useEffect(()=>{
    if (status === "authenticated" && sessionUserId){
      fetch({
        input: {
          userId: sessionUserId,
          email: session?.user?.email || "",
          name: session?.user?.name || "",
          image: session?.user?.image || undefined
        }
      })
    }
  },[fetch, session?.user?.email, session?.user?.image, session?.user?.name, sessionUserId, status])

  return (<>{children}</>)
}