import {useSession} from "next-auth/react"
import React, {ReactNode, useEffect} from "react"
import {useDispatch} from "react-redux"
import {dataStore} from "stores"

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({
  children
}: UserProviderProps) => {
  const {data: session, status} = useSession()
  const dispatch = useDispatch()

  useEffect(()=>{
    const sessionUserId = ((session?.user || {}) as any).id
    console.log("sessionUserId: ", sessionUserId); // TODO: remove

    if (status === "authenticated" && sessionUserId){
      dispatch(dataStore.actionCreators[dataStore.ActionType.PRERARE_LOGGED_IN_USER_DATA]({
        id: sessionUserId,
        email: session.user?.email || undefined,
        name: session.user?.name || undefined,
        image: session.user?.image || undefined
      }))
    }
  },[dispatch, session?.user, status])

  return (<>
    {children}
  </>)
}