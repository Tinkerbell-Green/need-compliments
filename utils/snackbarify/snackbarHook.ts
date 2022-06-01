import {useState,useEffect,useRef} from "react";

export const useSnackbar = (duration?:number)=>{
  const [isSnackbarVisible,setIsSnackbarVisible] = useState(false);
  const [snackbarDuration,setSnackbarDuration] = useState(duration || 3000);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(()=>{
    if(timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(()=>{
      console.log("end timer~~~~")
      setIsSnackbarVisible(false)
    },snackbarDuration);
  },[snackbarDuration])

  return {
    isSnackbarVisible, 
    setIsSnackbarVisible,
    snackbarDuration,
    setSnackbarDuration
  };
}