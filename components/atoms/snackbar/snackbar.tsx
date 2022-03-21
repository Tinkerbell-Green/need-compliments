import {PatchCheckFill} from "@styled-icons/bootstrap";
import {CloseOutline} from "@styled-icons/evaicons-outline";
import {InfoOutline} from "@styled-icons/evaicons-outline";
import {Warning} from "@styled-icons/fluentui-system-filled"
import {ReactNode, useEffect} from "react";
import * as S from "./snackbar.styled";
import {SnackbarType} from "stores/data/types";

type SnackbarProps = {
  children?: React.ReactNode,
  visible:boolean,
  type?: SnackbarType,
  message: string,
  duration?:number,
  onClose: ()=>void,
}

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
  visible,
  message,
  duration=3000,
  onClose,
}:SnackbarProps)=>{
  useEffect(()=>{
    visible && setTimeout(onClose,duration);
  },[duration,visible,onClose])
  
  return (
    <S.Container 
      isVisible={visible}
      color={TYPE_COLOR_MAP[type]}>
      <S.Icon>
        {TYPE_ICON_MAP[type]}
      </S.Icon>
      <S.Label>{message}</S.Label>
      <S.Button onClick={onClose}>
        <CloseOutline></CloseOutline>
      </S.Button>
      {children}
      <S.Progess>
        <S.Bar visible={visible} duration={duration}></S.Bar>
      </S.Progess>
    </S.Container>
    
  )
}