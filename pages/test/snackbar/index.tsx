import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar,SnackbarProps} from "components/atoms/snackbar";
import {SnackbarAnimation} from "components/moleculs/snackbarAnimation";
import {useSnackbar} from "utils/snackbarify/snackbarHook";

const SnackbarTestPage: NextPage = ()=>{
  const {isSnackbarVisible, setIsSnackbarVisible, snackbarDuration} = useSnackbar();

  const onSnackbarShowClick = useCallback(()=>{
    setIsSnackbarVisible({visible:true});
  },[setIsSnackbarVisible])

  const onSnackbarHideClick = useCallback(()=>{
    setIsSnackbarVisible({visible:false})
  },[setIsSnackbarVisible])

  const snackbarProps:SnackbarProps = {
    message: "This is snackbar!",
    type: "information",
    duration: snackbarDuration,
    onCloseClick: onSnackbarHideClick
  }

  return (
    <div style={{margin: "auto"}}>
      <button style={{margin: "150px 20px"}} onClick={onSnackbarShowClick}>SHOW SNACKBAR</button>
      <button style={{margin: "150px 20px"}} onClick={onSnackbarHideClick}>HIDE SNACKBAR</button>
      <SnackbarAnimation
        visible={isSnackbarVisible}
        Snackbar={()=><Snackbar {...snackbarProps}></Snackbar>}></SnackbarAnimation>
    </div>
  );
}

export default SnackbarTestPage;