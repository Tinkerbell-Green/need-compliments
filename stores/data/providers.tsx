import {useSession} from "next-auth/react"
import React, {ReactNode, useEffect} from "react"
import {useDataSaga} from "./hooks"
import {dataStore} from "stores"

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({
  children
}: UserProviderProps) => {
  const {data: session, status} = useSession()
  const {fetch} = useDataSaga(dataStore.ActionType.GET_LOGGED_IN_USER_DATA, [])

  useEffect(()=>{
    const sessionUserId = ((session?.user || {}) as any).id

    if (status === "authenticated" && sessionUserId){
      fetch({
        id: sessionUserId,
        email: session.user?.email || undefined,
        name: session.user?.name || undefined,
        image: session.user?.image || undefined
      })
    }
  },[fetch, session?.user, status])

  return (<>
    {children}
  </>)
}