import {useState,useCallback} from "react";

export type visibleState = {
  value: boolean
}

export const useSnackbarHooks = <snackbarPropsType extends {}>()=>{
  const [isSnackbarVisible,setIsVisible] = useState<visibleState>({value:false});
  const [snackbarDuration,setSnackbarDuration] = useState<number>(2500);
  const [snackbarProps,setSnackbarProps] = useState<snackbarPropsType>();

  const setIsSnackbarVisible = useCallback((value?: boolean)=>{
    if(value){
      setIsVisible({value: true});
    }else{
      setIsVisible({value: false});
    }
  },[])

  return {
    isSnackbarVisible, setIsSnackbarVisible,
    snackbarDuration,setSnackbarDuration,
    snackbarProps,setSnackbarProps,
  };
}

