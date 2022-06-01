import {useCallback, useEffect, useRef} from "react";
import * as S from "./snackbarAnimation.styled";
import {useSnackbar} from "utils/snackbarify/snackbarHook";

type SnackbarAnimationProps = {
  visible:boolean,
  Snackbar: React.ElementType
}

export const SnackbarAnimation = ({visible,Snackbar}:SnackbarAnimationProps)=>{
  const {isSnackbarVisible,setIsSnackbarVisible} = useSnackbar();

  useEffect(()=>{
    setIsSnackbarVisible(visible);
  },[visible,setIsSnackbarVisible])
  console.log(isSnackbarVisible)
  
  return (
    <S.Snackbarify isVisible={isSnackbarVisible}>
      <Snackbar key={Math.random()}></Snackbar>
    </S.Snackbarify>
  )
}