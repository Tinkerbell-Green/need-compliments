import {useState} from "react";

export const useSnackbar = (duration?:number)=>{
  const [isSnackbarVisible,setIsSnackbarVisible] = useState({visible:false});
  const [snackbarDuration,setSnackbarDuration] = useState(duration || 3000);
  
  return {
    isSnackbarVisible, 
    setIsSnackbarVisible,
    snackbarDuration,
    setSnackbarDuration
  };
}