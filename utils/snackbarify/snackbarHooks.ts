import {useState,useCallback} from "react";

export type visibleState = {
  value: boolean
}

export const useSnackbar = (visible?:boolean)=>{
  const [isSnackbarVisible,setIsSnackbarVisible] = useState<visibleState>({value:false});

  // const handleSnackbarShowClick = useCallback(() => {
  //   setIsSnackbarVisible({value: true});
  // }, [setIsSnackbarVisible]);

  // const handleSnackbarHideClick = useCallback(() => {
  //   setIsSnackbarVisible({value: false});
  // }, [setIsSnackbarVisible]);

  return [isSnackbarVisible, setIsSnackbarVisible] as const;
}