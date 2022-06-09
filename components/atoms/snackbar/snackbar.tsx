import {PatchCheckFill} from "@styled-icons/bootstrap";
import {CloseOutline} from "@styled-icons/evaicons-outline";
import {InfoOutline} from "@styled-icons/evaicons-outline";
import {Warning} from "@styled-icons/fluentui-system-filled"
import {ReactNode} from "react";
import * as S from "./snackbar.styled";
import {SnackbarType} from "stores/data/types";

export type SnackbarProps = {
  children?: React.ReactNode,
  isVisible:boolean,
  type?: SnackbarType,
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
  isVisible,
  type="information",
  message="",
  duration,
  onCloseClick,
}:SnackbarProps)=>{
  return (
    <S.Container color={TYPE_MAP[type].color}>
      {onCloseClick && <S.CloseButton onClick={onCloseClick}>
        <CloseOutline></CloseOutline>
      </S.CloseButton>}
      <S.Contents>
        <S.Icon>
          {TYPE_MAP[type].icon}
        </S.Icon>
        <S.Label>{message}</S.Label>
      </S.Contents>
      {children}
      {duration &&
      <S.Progess>
        <S.Bar duration={duration} isVisible={isVisible}></S.Bar>
      </S.Progess>}
    </S.Container>
  )
}