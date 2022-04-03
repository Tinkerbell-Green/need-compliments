import {useSession} from "next-auth/react"
import {useRouter} from "next/router"
import React, {ReactNode, useEffect, useMemo} from "react"
import {useDispatch} from "react-redux";
import {getSessionUserId} from "./authentication";
import {Spinner} from "components/atoms/spinner";
import {LayoutCenter} from "components/templates/layout-center"
import {navigationActionCreators, NavigationActionType} from "stores/navigation";

type AuthorizationProviderProps = {
  children: ReactNode
}

const PUBLIC_PAGE_PATHNAMES = ["/auth/signin","/"]

export const AuthorizationProvider = ({
  children
}: AuthorizationProviderProps) => {
  const router = useRouter();
  const {status, data: session} = useSession()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "unauthenticated") {
      // const SIGN_IN_PATHNAME = "/auth/signin"
      // if (router.pathname !== SIGN_IN_PATHNAME){
      //   router.push(SIGN_IN_PATHNAME);
      // }
      dispatch(navigationActionCreators[NavigationActionType.SET_INITIALIZED]({
        initialized: true
      }))   
    }
  }, [router,status,dispatch]);

  useEffect(()=>{
    const sessionUserId = getSessionUserId(session)

    if (status === "authenticated" && sessionUserId){
      dispatch(navigationActionCreators[NavigationActionType.SET_USER_ID]({
        key: "pageAuthorId",
        userId: sessionUserId
      }))

      dispatch(navigationActionCreators[NavigationActionType.SET_INITIALIZED]({
        initialized: true
      }))      
    }
  }, [dispatch, session, status])

  return (
    <>{children}</>
  )
}
