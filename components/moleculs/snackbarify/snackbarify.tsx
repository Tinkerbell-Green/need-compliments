import {useEffect, useRef,useState} from "react";
import * as S from "./snackbarify.styled";
import SnackbarifyPortal from "utils/portal";
import {useSnackbar,useSnackbarDuration,visibleState} from "utils/snackbarify";

export type SnackbarifyProps = {
  visible: visibleState,
  Snackbar: React.ElementType
}

export const Snackbarify = ({
  visible,
  Snackbar
}:SnackbarifyProps)=>{
  const [isSnackbarVisible, setIsSnackbarVisible] = useSnackbar();
  const [snackbarDuration] = useSnackbarDuration();
  const [isSnackbarMount, setIsSnackbarMount] = useState(false);

  const timer = useRef<NodeJS.Timeout>();
  const transitionDuration = useRef<number>(400);

  useEffect(()=>{
    if(isSnackbarVisible.value){
      setIsSnackbarMount(true);
    }else{
      setTimeout(()=>{
        setIsSnackbarMount(false);
      },transitionDuration.current)
    }
  },[isSnackbarVisible])

  useEffect(()=>{
    setIsSnackbarVisible(visible);
    timer.current && clearTimeout(timer.current);

    timer.current = visible.value
      ? setTimeout(()=>{
        setIsSnackbarVisible({value:false})
      },snackbarDuration)
      : undefined;
  },[snackbarDuration,setIsSnackbarVisible,visible])
  
  return <SnackbarifyPortal selector="#root-snackbarify">
    <S.Snackbarify
      isVisible={isSnackbarVisible.value}
      transitionDuration={transitionDuration.current}>
      {isSnackbarMount && <Snackbar
        key={Math.random()}
        aria-label={"snackbar"}></Snackbar>}
    </S.Snackbarify>
  </SnackbarifyPortal>
}