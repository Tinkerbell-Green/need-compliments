import {useState,useEffect,useRef} from "react";

const DURATION=3000;

export const useSnackbar = (visible:boolean)=>{
  const [isSnackbarVisible,setIsSnackbarVisible] = useState(visible);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(()=>{
    setIsSnackbarVisible(visible);

    if(timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(()=>{
      setIsSnackbarVisible(false)
    },DURATION);
  },[visible])

  return [isSnackbarVisible, setIsSnackbarVisible] as const;
}