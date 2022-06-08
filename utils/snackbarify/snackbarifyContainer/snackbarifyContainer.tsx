import {useCallback, useEffect, useRef,useState} from "react";
import * as S from "./snackbarifyContainer.styled";
import SnackbarifyPortal from "utils/portal";
import {visibleState} from "utils/snackbarify";

export type SnackbarifyContainerProps = {
  visible: visibleState,
  children: React.ReactNode
}

export const SnackbarifyContainer = ({
  children,
  visible,
}:SnackbarifyContainerProps)=>{
  const [isSnackbarMount, setIsSnackbarMount] = useState(false);
  const transitionDuration = useRef<number>(400);

  useEffect(()=>{
    if(visible.value) setIsSnackbarMount(true);
    else{
      setTimeout(()=>{
        setIsSnackbarMount(false);
      },transitionDuration.current)
    }

  },[visible])
  
  return (
    <SnackbarifyPortal seletorId="root-snackbar">
      <S.SnackbarifyContainer
        isVisible={visible.value}
        transitionDuration={transitionDuration.current}
        role="alert">
        {isSnackbarMount && children}
      </S.SnackbarifyContainer>
    </SnackbarifyPortal>
  )
}