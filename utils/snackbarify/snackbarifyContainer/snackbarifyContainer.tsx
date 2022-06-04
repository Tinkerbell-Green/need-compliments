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
  duration=3000,
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
    setIsSnackbarVisible(visible);
    timer.current && clearTimeout(timer.current);

    timer.current = visible.value
      ? setTimeout(()=>{
        setIsSnackbarVisible({value:false})
      },snackbarDuration.current)
      : undefined;
  },[snackbarDuration,setIsSnackbarVisible,visible])
  
  return (
    <SnackbarifyPortal>
      <S.SnackbarifyContainer
        isVisible={isSnackbarVisible.value}
        transitionDuration={transitionDuration.current}>
        {isSnackbarMount && <Snackbar
          key={Math.random()}
          aria-label={"snackbar"}></Snackbar>}
      </S.SnackbarifyContainer>
    </SnackbarifyPortal>
  )
}