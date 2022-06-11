import {useState,useRef,useEffect,useContext, useCallback} from "react";
import styled,{css} from "styled-components";
import {Portal} from "utils/portal";
import {SnackbarifyContext,snackbarifyType} from "utils/snackbarify"

const SnackbarifyStyled = styled.div<{isVisible:boolean, transitionDuration:number}>`
position: fixed;
top: 5%;
left: 50%;
transform: translate(-50%, 0%);
transition: all ${props=>props.transitionDuration}ms ease-in-out;
${props => props.isVisible 
    ? css`
    opacity: 1;
    background-color: aqua;
    `
    : css`
    opacity: 0;
    `
};`

export const Snackbarify = ()=>{
  const {isSnackbarVisible, 
    setIsSnackbarVisible, 
    snackbarDuration, 
    SnackbarComponent
  } = useContext(SnackbarifyContext) as snackbarifyType;
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
    console.log(show)
  },[])

  useEffect(()=>{
    timer.current && clearTimeout(timer.current);
    console.log(snackbarDuration)
    if(isSnackbarVisible.value) handleMount(true);
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
        {isSnackbarMount &&
        <div style={{backgroundColor:  "gold"}}>snackbarrrrr</div>
          // <SnackbarComponent
          //   key={Math.random()}
          //   aria-live="assertive"
          //   aria-atomic={true}
          // ></SnackbarComponent>
        }
      </SnackbarifyStyled>
    </Portal>
  )
}