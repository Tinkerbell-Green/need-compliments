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
  const {fetch, data} = useDataSaga(dataStore.ActionType.GET_LOGGED_IN_USER_DATA, [])

  useEffect(()=>{
    console.log("status: ", status); // TODO: remove 
  },[status])
  
  useEffect(()=>{
    const sessionUserId = ((session?.user || {}) as any).id
    console.log("sessionUserId: ", sessionUserId); // TODO: remove

    if (status === "authenticated" && sessionUserId){
      fetch({
        id: sessionUserId,
        email: session.user?.email || undefined,
        name: session.user?.name || undefined,
        image: session.user?.image || undefined
      })
    }
  },[fetch, session?.user, status])

  useEffect(()=>{
    console.log("data: ", data); // TODO: remove 
  },[data])

  return (<>
    {children}
  </>)
}