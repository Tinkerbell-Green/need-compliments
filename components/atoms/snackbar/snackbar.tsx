import {PatchCheckFill} from "@styled-icons/bootstrap";
import {CloseOutline} from "@styled-icons/evaicons-outline";
import {InfoOutline} from "@styled-icons/evaicons-outline";
import {Warning} from "@styled-icons/fluentui-system-filled"
import {ReactNode, useEffect, useState} from "react";
import * as S from "./snackbar.styled";

type SnackbarProps = {
  children?: React.ReactNode,
  type?: SnackbarType,
  label: string,
  duration?:number,
}

export type SnackbarType = "success" | "information"| "warning"|"error";

const TYPE_COLOR_MAP:Record<SnackbarType,string> = {
  success: "#6AAC5E",
  information: "#2D9AD3",
  warning : "#EF9100",
  error: "#FF5757",
}

const TYPE_ICON_MAP:Record<SnackbarType, ReactNode> = {
  success: <PatchCheckFill/>,
  information: <InfoOutline/>,
  warning : <Warning/>,
  error: <InfoOutline/>,
}

export const Snackbar = ({
  children,
  type="information",
  label,
  duration=5000,
}:SnackbarProps)=>{
  const [isVisible, setIsVisible] = useState(true);
  useEffect(()=>{
    setTimeout(()=>setIsVisible(false),duration);
  })

  return (
    <S.Container 
      isVisible={isVisible} 
      color={TYPE_COLOR_MAP[type]}>
      <S.Icon>
        {TYPE_ICON_MAP[type]}
      </S.Icon>
      <S.Label>{label}</S.Label>
      <S.Button onClick={()=>setIsVisible(false)}>
        <CloseOutline></CloseOutline>
      </S.Button>
      {children}
    </S.Container>
    
  )
}