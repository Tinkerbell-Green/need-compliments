import {useSession} from "next-auth/react"
import {useRouter} from "next/router"
import React, {ReactNode, useEffect, useMemo} from "react"
import {Snackbar} from "components/atoms/snackbar";
import {Spinner} from "components/atoms/spinner";
import {LayoutCenter} from "components/templates/layout-center"

type AuthorizationProviderProps = {
  children: ReactNode
}

const PUBLIC_PAGE_PATHNAMES = ["/auth/signin"]

export const AuthorizationProvider = ({
  children
}: AuthorizationProviderProps) => {
  const router = useRouter();
  const {status} = useSession()
  console.log("AuthorizationProvider", status);
  useEffect(() => {
    if (status === "unauthenticated") {
      const SIGN_IN_PATHNAME = "/auth/signin"
      if (router.pathname !== SIGN_IN_PATHNAME){
        router.push(SIGN_IN_PATHNAME);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const isPublicPage = useMemo(()=>{
    return PUBLIC_PAGE_PATHNAMES.some(item=>{
      return router.pathname.includes(item)
    })
  },[router.pathname])

  return (<>{
    status === "loading"
      ? <LayoutCenter>
        <Spinner
          text={"🧚‍♀️~여기는 칭찬이 필요해 입니다~🧚‍♀️"} color="skyblue"></Spinner>
      </LayoutCenter>
      : (status === "unauthenticated") && !isPublicPage 
        ? <LayoutCenter>로그인 페이지로 이동합니다 🏃🏃🏻‍♀️</LayoutCenter>
        : children
  }</>)
}