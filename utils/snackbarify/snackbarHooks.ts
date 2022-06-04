import {useState,useCallback} from "react";

export type visibleState = {
  value: boolean
}

export const useSnackbar = (visible?:boolean)=>{
  const [isSnackbarVisible,setIsVisible] = useState<visibleState>(visible ? {value:visible} : {value:false});
  
  const setIsSnackbarVisible = useCallback((show:boolean)=>{
    if(show){
      setIsVisible({value: show});
    }else{
      setIsVisible({value: show});
    }
  },[])

  return [isSnackbarVisible, setIsSnackbarVisible] as const;
}