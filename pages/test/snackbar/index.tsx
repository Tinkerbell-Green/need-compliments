import {NextPage} from "next";
import {useCallback,useState} from "react";
import {Snackbar} from "components/atoms/snackbar";
import {SnackbarType} from "stores/data/types";

type SnackbarProps = {
  visible: boolean,
  message: string,
  type: SnackbarType
  duration?:number,
}

const SnackbarTestPage: NextPage = ()=>{
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    visible: false,
    message: "",
    type: "information",
    duration:1000,
  });

  const onSnackbarShowClick = useCallback(()=>{
    setSnackbarProps({
      visible:true,
      message:"스낵바 입니다~~~",
      type:"information",
      duration:5000,
    })
  },[])
  const onSnackbarHideClick = useCallback(()=>{
    setSnackbarProps({
      visible:false,
      message:"스낵바 입니다~~~",
      type:"information",
      duration:5000,
    })
  },[])


  return (
    <div style={{margin: "auto"}}>
      <button style={{padding: "50px"}} onClick={onSnackbarShowClick}>SHOW SNACKBAR</button>
      <button style={{padding: "50px"}} onClick={onSnackbarHideClick}>HIDE SNACKBAR</button>
      <Snackbar 
        key={Math.random()}
        {...snackbarProps}
        onClose={()=>setSnackbarProps({...snackbarProps, visible:false})}></Snackbar>
    </div>
  );
}

export default SnackbarTestPage;