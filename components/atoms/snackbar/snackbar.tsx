import {PatchCheckFill} from "@styled-icons/bootstrap";
import {CloseOutline} from "@styled-icons/evaicons-outline";
import {InfoOutline} from "@styled-icons/evaicons-outline";
import {Warning} from "@styled-icons/fluentui-system-filled"
import {ReactNode} from "react";
import * as S from "./snackbar.styled";
import {SnackbarType} from "stores/data/types";

export type SnackbarProps = {
  children?: React.ReactNode,
  type: SnackbarType,
  message: string,
  duration?:number,
  onCloseClick?: ()=>void,
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
  message="",
  duration,
  onCloseClick,
}:SnackbarProps)=>{

  return (
    <S.Container
      role="alert"
      color={TYPE_MAP[type].color}>
      <div>
        <S.Icon>
          {TYPE_MAP[type].icon}
        </S.Icon>
        <S.Label>{message}</S.Label>
      </div>
      {onCloseClick && <S.CloseButton onClick={onCloseClick}>
        <CloseOutline></CloseOutline>
      </S.CloseButton>}
      {children}
      {duration && <S.Progess>
        <S.Bar duration={duration}></S.Bar>
      </S.Progess>}
    </S.Container>
  )
}