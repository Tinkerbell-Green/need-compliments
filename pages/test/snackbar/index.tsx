import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar} from "components/atoms/snackbar";
import {SnackbarType} from "stores/data/types";
import {useSnackbar} from "utils/snackbarHook";

type SnackbarProps = {
  visible: boolean,
  message?: string,
  type?: SnackbarType
  duration?:number,
}

const SnackbarTestPage: NextPage = ()=>{
  const [isSnackbarVisible, setIsSnackbarVisible] = useSnackbar(false);

  // const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
  //   visible: false,
  //   message: "",
  //   type: "information",
  //   duration:1000,
  // });

  const onSnackbarShowClick = useCallback(()=>{
    setIsSnackbarVisible(true);
  },[setIsSnackbarVisible])

  const onSnackbarHideClick = useCallback(()=>{
    setIsSnackbarVisible(false)
  },[setIsSnackbarVisible])


  return (
    <div style={{margin: "auto"}}>
      <button style={{padding: "50px"}} onClick={onSnackbarShowClick}>SHOW SNACKBAR</button>
      <button style={{padding: "50px"}} onClick={onSnackbarHideClick}>HIDE SNACKBAR</button>
      <Snackbar
        key={Math.random()}
        visible={isSnackbarVisible}
        onCloseClose={onSnackbarHideClick}></Snackbar>
    </div>
  );
}

export default SnackbarTestPage;