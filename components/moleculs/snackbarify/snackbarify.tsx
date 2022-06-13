import {useState,useRef,useEffect,useContext} from "react";
import styled,{css} from "styled-components";
import SnackbarifyPortal from "utils/portal";
import {SnackbarifyContext,snackbarifyType} from "utils/snackbarify"

const SnackbarifyStyled = styled.div<{isVisible:boolean, transitionDuration:number}>`
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

export const Snackbarify = ()=>{
  const {isSnackbarVisible, 
    setIsSnackbarVisible, 
    snackbarDuration, 
    SnackbarComponent
  } = useContext(SnackbarifyContext) as snackbarifyType;
  const [isSnackbarMount, setIsSnackbarMount] = useState(false);
  console.log(isSnackbarVisible,snackbarDuration,SnackbarComponent)
  const transitionDuration = useRef<number>(500);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(()=>{
    timer.current && clearTimeout(timer.current);

    timer.current = isSnackbarVisible.value
      ? setTimeout(()=>{
        setIsSnackbarVisible(false);
      },snackbarDuration)
      : undefined;
  },[isSnackbarVisible,snackbarDuration,setIsSnackbarVisible])

  useEffect(()=>{
    if(isSnackbarVisible.value) setIsSnackbarMount(true);
    else{
      setTimeout(()=>{
        setIsSnackbarMount(false);
      },transitionDuration.current)
    }
  },[isSnackbarVisible.value])

  return ( 
    <SnackbarifyPortal seletorId="root-snackbar">
      <SnackbarifyStyled
        isVisible={isSnackbarVisible.value}
        transitionDuration={transitionDuration.current}
        role="alert">
        {isSnackbarMount && SnackbarComponent &&
          <SnackbarComponent
            key={Math.random()}
            aria-live="assertive"
            aria-atomic={true}
          ></SnackbarComponent>}
      </SnackbarifyStyled>
    </SnackbarifyPortal>
  )
}