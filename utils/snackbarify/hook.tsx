import {useState,useCallback, ElementType} from "react";

export type visibleState = {
  value: boolean
}

export const useSnackbarHooks = ()=>{
  const [isSnackbarVisible,setIsVisible] = useState({value:false});
  const [SnackbarComponent,setSnackbar] = useState<ElementType | undefined>();
  const [snackbarDuration,setSnackbarDuration] = useState(2500);

  const setIsSnackbarVisible = useCallback((value?: boolean)=>{
    if(value){
      setIsVisible({value: true});
    }else{
      setIsVisible({value: false});
    }
  },[])

  return {
    isSnackbarVisible, setIsSnackbarVisible,
    snackbarDuration, setSnackbarDuration,
    SnackbarComponent,setSnackbar,
  };
}

