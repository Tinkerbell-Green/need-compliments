import {useState} from "react";

export type visibleState = {
  value: boolean
}

export const useSnackbar = ()=>{
  const [isSnackbarVisible,setIsSnackbarVisible] = useState<visibleState>({value:false});
  
  return [isSnackbarVisible, setIsSnackbarVisible] as const;
}

export const useSnackbarDuration = (duration?:number)=>{
  const [snackbarDuration,setSnackbarDuration] = useState(duration || 3000);

  return [snackbarDuration,setSnackbarDuration] as const;
}