import {useSession} from "next-auth/react"
import {useRouter} from "next/router"
import React, {ReactNode, useEffect, useMemo} from "react"
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
  
  useEffect(() => {
    if (status === "unauthenticated") {
      const SIGN_IN_PATHNAME = "/auth/signin"
      if (router.pathname !== SIGN_IN_PATHNAME){
        router.push(SIGN_IN_PATHNAME);
      }
    }
  }, [router, status]);

  const isPublicPage = useMemo(()=>{
    return PUBLIC_PAGE_PATHNAMES.some(item=>{
      return router.pathname.includes(item)
    })
  },[router.pathname])

  return (<>{
    status === "loading" 
      ?  <LayoutCenter>{"loading"}</LayoutCenter>
      : (status === "unauthenticated") && !isPublicPage 
        ? <LayoutCenter>{"unauthenticated"}</LayoutCenter>
        : children
  }</>)
}