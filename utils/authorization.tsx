import {useSession} from "next-auth/react"
import {useRouter} from "next/router"
import React, {ReactNode, useEffect, useMemo} from "react"
import {useDispatch} from "react-redux";
import {getSessionUserId} from "./authentication";
import {Spinner} from "components/atoms/spinner";
import {LayoutCenter} from "components/templates/layout-center"
import {DataActionType, useDataSaga} from "stores/data";
import {navigationActionCreators, NavigationActionType} from "stores/navigation";

type AuthorizationProviderProps = {
  children: ReactNode
}

const PUBLIC_PAGE_PATHNAMES = ["/auth/signin","/test"]

export const AuthorizationProvider = ({
  children
}: AuthorizationProviderProps) => {
  const router = useRouter();
  const {status, data: session} = useSession()
  const dispatch = useDispatch()
  const {data} = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA, [])
  const redirection = useMemo(()=>{
    const currentPath = router.pathname;
      
    if (currentPath !== "/" && !PUBLIC_PAGE_PATHNAMES.filter(path => currentPath.includes(path)).length) return true;
    return false;
  },[router.pathname])

  useEffect(() => {
    if (status === "unauthenticated") {
      if(redirection){
        router.replace("/")
      }
      dispatch(navigationActionCreators[NavigationActionType.SET_INITIALIZED]({
        initialized: true
      }))   
    }
  }, [router,status,dispatch,redirection]);

  useEffect(()=>{
    if (status === "authenticated" && data?.user.userId){
      dispatch(navigationActionCreators[NavigationActionType.SET_USER_ID]({
        key: "pageAuthorId",
        userId: data?.user.userId
      }))

      dispatch(navigationActionCreators[NavigationActionType.SET_INITIALIZED]({
        initialized: true
      }))      
    }
  }, [data?.user.userId, dispatch, session, status])

  if(status === "loading" && redirection) return (<LayoutCenter><Spinner></Spinner></LayoutCenter>);
  return <>{children}</>
}