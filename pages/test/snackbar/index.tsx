import {NextPage} from "next";
import {useCallback,useState,useEffect} from "react";
import {Snackbar,SnackbarProps} from "components/atoms/snackbar";
import {useSnackbar} from "utils/snackbarify/snackbarHooks";

const SnackbarTestPage: NextPage = () => {
  const [snackbarProps,setSnackbarProps] = useState<SnackbarProps>({message:"", isVisible: false,duration: 3000})

  const snackbarComponent = useCallback(()=>{
    return (<Snackbar {...snackbarProps}></Snackbar>)}
  ,[snackbarProps]);
  
  const {isSnackbarVisible, setIsSnackbarVisible,snackbarifyContainer} = useSnackbar(snackbarComponent, 3000);

  const handleSnackbarHideClick = useCallback(() => {
    setSnackbarProps((state)=>({...state, isVisible: false}))
    setIsSnackbarVisible(false)
  }, [setSnackbarProps,setIsSnackbarVisible]);
  
  const handleSnackbarChange = useCallback((newProps) => {
    setSnackbarProps((state)=>({...state,...newProps, isVisible: true, onCloseClick:handleSnackbarHideClick}))
    setIsSnackbarVisible(true);
  }, [setSnackbarProps,handleSnackbarHideClick,setIsSnackbarVisible]);

  useEffect(() => {
    if(!isSnackbarVisible.value){
      handleSnackbarHideClick();
    }
  }, [isSnackbarVisible.value,handleSnackbarHideClick])
  


  return (
    <div style={{flexDirection:"column"}}>
      {snackbarifyContainer}
      <button style={{padding: "20px", textAlign: "left"}} 
        onClick={()=>handleSnackbarChange({message: "데이터가 성공적으로 저장저장 완료완료",type:"success"})}>
        ✅ Show Success
      </button>
      <button style={{padding: "20px", textAlign: "left"}}
        onClick={()=>handleSnackbarChange({message: "일시적으로 저장 실패실패 에러에러",type:"error"})}>
				❌ Show Error
      </button>
      <button style={{padding: "20px", textAlign: "left"}}
        onClick={()=>handleSnackbarChange({message: "이거슨 정보입니다. 정보정보",type:"information"})}>
				🔵 Show Information
      </button>
      <button style={{padding: "20px", textAlign: "left"}}
        onClick={()=>handleSnackbarChange({message: "경고한다 경고힌다",type:"warning"})}>
				⚠️ Show Warning
      </button>
      <button style={{padding: "20px", textAlign: "left"}} onClick={handleSnackbarHideClick}>
				Hide
      </button>
      {snackbarifyContainer}
    </div>
  );
};

export default SnackbarTestPage;
