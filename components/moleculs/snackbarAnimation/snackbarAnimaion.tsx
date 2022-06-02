import {useEffect, useRef} from "react";
import * as S from "./snackbarAnimation.styled";
import {useSnackbar} from "utils/snackbarify/snackbarHook";

type SnackbarAnimationProps = {
  visible:{visible:boolean},
  Snackbar: React.ElementType
}

export const SnackbarAnimation = ({visible,Snackbar}:SnackbarAnimationProps)=>{
  const {isSnackbarVisible,setIsSnackbarVisible,snackbarDuration} = useSnackbar();
  const timer = useRef<NodeJS.Timeout>();

  useEffect(()=>{
    setIsSnackbarVisible(visible);

    if(timer.current){
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(()=>{
      console.log(snackbarDuration,"end timer!")
      setIsSnackbarVisible({visible:false})
    },snackbarDuration);
  },[snackbarDuration,setIsSnackbarVisible,visible])
  
  return (
    <S.Snackbarify isVisible={isSnackbarVisible.visible}>
      <Snackbar key={Math.random()}></Snackbar>
    </S.Snackbarify>
  )
}