import {useState,useRef,useEffect, useCallback,ElementType} from "react";
import styled,{css} from "styled-components";
import {Portal} from "utils/portal";
import {useSnackbarifyState} from "utils/snackbarify"

const SnackbarifyStyled = styled.div<{isVisible:boolean, transitionDuration:number}>`
position: fixed;
top: 5%;
left: 50%;
transform: translate(-50%, 0%);
transition: all ${props=>props.transitionDuration}ms ease-in-out;
${props => props.isVisible 
    ? css`
    opacity: 1;
    `
    : css`
    opacity: 0;
    `
};`

type SnackbarifyProps = {
  Snackbar: ElementType
}

export const Snackbarify = ({Snackbar}:SnackbarifyProps)=>{
  const {
    isSnackbarVisible, setIsSnackbarVisible,
    snackbarDuration,
    snackbarProps,
  } = useSnackbarifyState();
  const [isSnackbarMount, setIsSnackbarMount] = useState(false);
  
  const transitionDuration = useRef<number>(500);
  const timer = useRef<NodeJS.Timeout>();

  const handleMount = useCallback((show:boolean)=>{
    if(show) setIsSnackbarMount(true);
    else{
      setTimeout(()=>{
        setIsSnackbarMount(false);
      },transitionDuration.current)
    }
  },[])

  useEffect(()=>{
    if(isSnackbarVisible.value) handleMount(true);
    
    timer.current && clearTimeout(timer.current);
    timer.current = isSnackbarVisible.value
      ? setTimeout(()=>{
        setIsSnackbarVisible(false);
        handleMount(false);
      },snackbarDuration)
      : undefined;
  },[isSnackbarVisible,snackbarDuration,setIsSnackbarVisible,handleMount])
  
  return (
    <Portal seletorId="root-snackbar">
      <SnackbarifyStyled
        isVisible={isSnackbarVisible.value}
        transitionDuration={transitionDuration.current}
        role="alert">
        {isSnackbarMount && Snackbar &&
        <Snackbar
          key={Math.random()}
          aria-live="assertive"
          aria-atomic={true}
          {...snackbarProps}
        ></Snackbar>
        }
      </SnackbarifyStyled>
    </Portal>
  )
}