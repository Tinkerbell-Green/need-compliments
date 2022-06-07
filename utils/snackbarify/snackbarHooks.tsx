import {useState,useCallback, ReactNode, ElementType} from "react";

export type visibleState = {
  value: boolean
}

// options을 제네릭으로 받아 
export type options = {

}

export const useSnackbar = (snackbar?:ElementType, options?:options)=>{
  const [isSnackbarVisible,setIsVisible] = useState<visibleState>({value:false});
  
  const setIsSnackbarVisible = useCallback((show:boolean)=>{
    if(show){
      setIsVisible({value: show});
    }else{
      setIsVisible({value: show});
    }
  },[])

  return {isSnackbarVisible, setIsSnackbarVisible};
}