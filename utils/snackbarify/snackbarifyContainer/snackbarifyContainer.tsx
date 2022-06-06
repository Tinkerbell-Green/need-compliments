import {useCallback, useEffect, useRef,useState} from "react";
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

  const handleUnmount = useCallback(()=>{
    setTimeout(()=>{
      setIsSnackbarMount(false);
    },transitionDuration.current)
  },[])

  useEffect(()=>{
    setIsSnackbarVisible(visible.value);
    
    if(visible.value) setIsSnackbarMount(true);

    timer.current && clearTimeout(timer.current);
    timer.current = visible.value
      ? setTimeout(()=>{
        setIsSnackbarVisible(false);
        handleUnmount();
      },snackbarDuration.current)
      : undefined;
  },[setIsSnackbarVisible,visible,handleUnmount])
  
  return (
    <SnackbarifyPortal seletorId="root-snackbar">
      <S.SnackbarifyContainer
        isVisible={isSnackbarVisible.value}
        transitionDuration={transitionDuration.current}
        role="alert">
        {isSnackbarMount && <Snackbar
          key={Math.random()}
          aria-live="assertive"
          aria-atomic={true}
        ></Snackbar>}
      </S.SnackbarifyContainer>
    </SnackbarifyPortal>
  )
}