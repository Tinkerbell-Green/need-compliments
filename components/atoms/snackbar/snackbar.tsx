import {PatchCheckFill} from "@styled-icons/bootstrap";
import {CloseOutline} from "@styled-icons/evaicons-outline";
import {InfoOutline} from "@styled-icons/evaicons-outline";
import {Warning} from "@styled-icons/fluentui-system-filled"
import {ReactNode, useEffect,useRef} from "react";
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

type Property = {
  color: string,
  icon : ReactNode
}

const TYPE_MAP:Record<SnackbarType,Property> = {
  success: {
    color: "#6AAC5E",
    icon: <PatchCheckFill/>
  },
  information: {
    color: "#2D9AD3",
    icon: <InfoOutline/>
  },
  warning : {
    color: "#EF9100",
    icon: <Warning/>
  },
  error: {
    color: "#FF5757",
    icon: <InfoOutline/>
  },
}

export const Snackbar = ({
  children,
  type="information",
  visible,
  message,
  duration=3000,
  onClose,
}:SnackbarProps)=>{
  const dialogRef = useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(visible) dialogRef?.current?.focus();
    else dialogRef?.current?.blur();
    
    visible && setTimeout(onClose,duration);
  },[duration,visible,onClose])

  return (
    <S.Container 
      role="dialog"
      ref={dialogRef}
      tabIndex={-1}
      isVisible={visible}
      color={TYPE_MAP[type].color}
      aria-label={message}>
      <S.Icon>
        {TYPE_MAP[type].icon}
      </S.Icon>
      <S.Label>{message}</S.Label>
      <span>
        <S.Button onClick={onClose}>
          <CloseOutline></CloseOutline>
        </S.Button>
      </span>
      {children}
      <S.Progess>
        <S.Bar visible={visible} duration={duration}></S.Bar>
      </S.Progess>
    </S.Container>
    
  )
}