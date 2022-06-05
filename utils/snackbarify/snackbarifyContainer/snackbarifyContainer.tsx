import {useEffect, useRef,useState} from "react";
import * as S from "./snackbarifyContainer.styled";
import SnackbarifyPortal from "utils/portal";
import {useSnackbar,visibleState} from "utils/snackbarify";

export type SnackbarifyContainerProps = {
  visible: visibleState,
  duration?:number,
  Snackbar: React.ElementType
}

export const SnackbarifyContainer = ({
  visible,
  duration=2500,
  Snackbar
}:SnackbarifyContainerProps)=>{
  const [isSnackbarVisible, setIsSnackbarVisible] = useSnackbar();
  const [isSnackbarMount, setIsSnackbarMount] = useState(false);

  const timer = useRef<NodeJS.Timeout>();
  const transitionDuration = useRef<number>(400);
  const snackbarDuration = useRef<number>(duration);

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
    setIsSnackbarVisible(visible.value);
    timer.current && clearTimeout(timer.current);

    timer.current = visible.value
      ? setTimeout(()=>{
        setIsSnackbarVisible(false)
      },snackbarDuration.current)
      : undefined;
  },[snackbarDuration,setIsSnackbarVisible,visible])
  
  return (
    <SnackbarifyPortal seletorId="root-snackbar">
      <S.SnackbarifyContainer
        isVisible={isSnackbarVisible.value}
        transitionDuration={transitionDuration.current}>
        {isSnackbarMount && <Snackbar
          key={Math.random()}
          role="alert"
          aria-label={"snackbar"}
          tabIndex={0}></Snackbar>}
      </S.SnackbarifyContainer>
    </SnackbarifyPortal>
  )
}