import {useState,useCallback, useMemo, ElementType,useRef,useEffect} from "react";
import {SnackbarifyContainer} from "./snackbarifyContainer";
import {SnackbarProps} from "components/atoms/snackbar";

export type visibleState = {
  value: boolean
}

// options을 제네릭으로 받아 
export type options = {
  duration:number
}

export const useSnackbar = (Snackbar:ElementType, duration?: number, options?:SnackbarProps)=>{
  const [isSnackbarVisible,setIsVisible] = useState<visibleState>({value:false});
  const [snackbarOptions,setSnackbarOptions] = useState(options);

  const timer = useRef<NodeJS.Timeout>();
  const snackbarDuration = useRef<number>(duration || 2500);
  
  const setIsSnackbarVisible = useCallback((show:boolean)=>{
    if(show){
      setIsVisible({value: show});
    }else{
      setIsVisible({value: show});
    }
  },[])

  useEffect(()=>{
    timer.current && clearTimeout(timer.current);
    
    timer.current = isSnackbarVisible.value
      ? setTimeout(()=>{
        setIsVisible({value:false})
      },snackbarDuration.current)
      : undefined;
  },[isSnackbarVisible])

  const snackbarifyContainer = useMemo(()=> {
    return ( 
      <SnackbarifyContainer 
        visible={isSnackbarVisible}
      ><Snackbar
          key={Math.random()}
          aria-live="assertive"
          aria-atomic={true}
          {...snackbarOptions}
        ></Snackbar>
      </SnackbarifyContainer>
    )},[isSnackbarVisible,snackbarOptions,Snackbar])

  return {
    isSnackbarVisible, 
    setIsSnackbarVisible, 
    snackbarOptions,
    setSnackbarOptions, 
    snackbarifyContainer
  };
}