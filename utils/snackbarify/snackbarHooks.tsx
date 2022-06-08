import {useState,useCallback, useMemo, ElementType, useRef,useEffect} from "react";
import styled,{css} from "styled-components";
import SnackbarifyPortal from "utils/portal";

const Snackbarify = styled.div<{isVisible:boolean, transitionDuration:number}>`
position: fixed;
top: 5%;
left: 50%;
transition: all ${props=>props.transitionDuration}ms ease-in-out;
${props => props.isVisible 
    ? css`
    opacity: 1;
    transform: translate(-50%, 0%);
    `
    : css`
    opacity: 0;
    transform: translate(-50%, 0%);
    `
};
`
export type visibleState = {
  value: boolean
}

export const useSnackbar = (
  SnackbarComponent: ElementType, 
  duration?: number)=>{
  const [isSnackbarVisible,setIsVisible] = useState<visibleState>({value:false});
  const [isSnackbarMount, setIsSnackbarMount] = useState(false);

  const transitionDuration = useRef<number>(500);
  const timer = useRef<NodeJS.Timeout>();
  const snackbarDuration = useRef(duration || 2500);
  
  const setIsSnackbarVisible = useCallback((show:boolean)=>{
    if(show){
      setIsVisible({value: true});
    }else{
      setIsVisible({value: false});
    }
  },[])

  useEffect(()=>{
    timer.current && clearTimeout(timer.current);

    timer.current = isSnackbarVisible.value
      ? setTimeout(()=>{
        setIsVisible({value:false});
      },snackbarDuration.current)
      : undefined;
  },[isSnackbarVisible])

  useEffect(()=>{
    if(isSnackbarVisible.value) setIsSnackbarMount(true);
    else{
      setTimeout(()=>{
        setIsSnackbarMount(false);
      },transitionDuration.current)
    }
  },[isSnackbarVisible.value])

  const snackbarifyContainer = useMemo(()=> {
    return ( 
      <SnackbarifyPortal seletorId="root-snackbar">
        <Snackbarify
          isVisible={isSnackbarVisible.value}
          transitionDuration={transitionDuration.current}
          role="alert">
          {isSnackbarMount && 
          <SnackbarComponent
            key={Math.random()}
            aria-live="assertive"
            aria-atomic={true}
          ></SnackbarComponent>}
        </Snackbarify>
      </SnackbarifyPortal>
    )},[isSnackbarVisible,SnackbarComponent,isSnackbarMount])

  return {
    isSnackbarVisible, 
    setIsSnackbarVisible,
    snackbarifyContainer
  };
}