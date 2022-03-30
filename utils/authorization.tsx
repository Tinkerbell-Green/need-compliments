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
      const SIGN_IN_PATHNAME = "/auth/signin"
      if (router.pathname !== SIGN_IN_PATHNAME){
        // router.push(SIGN_IN_PATHNAME);
      }
    }
  }, [router,status]);

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

  const isPublicPage = useMemo(()=>{
    return PUBLIC_PAGE_PATHNAMES.some(item=>{
      return router.pathname.includes(item)
    })
  },[router.pathname])

  return (<>{
    status === "loading"
      ? <LayoutCenter>
        <Spinner
          text={"🧚‍♀️ 우리 모두 칭찬이 필요해 🧚‍♀️"} color="skyblue"></Spinner>
      </LayoutCenter>
      : (status === "unauthenticated") && !isPublicPage 
        ? <LayoutCenter>
          <Spinner
            text={"로그인 페이지로 이동합니다 🏃🏃🏻‍♀️"} color="skyblue"></Spinner></LayoutCenter>
        : children
  }</>)
}
