import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar,SnackbarProps} from "components/atoms/snackbar";
import {useSnackbar} from "utils/snackbarify/snackbarHooks";

const SnackbarTestPage: NextPage = () => {
  const handleSnackbarHideClick = useCallback(() => {
    setIsSnackbarVisible(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const {isSnackbarVisible, 
    setIsSnackbarVisible, 
    snackbarOptions,
    setSnackbarOptions,
    snackbarifyContainer
  } = useSnackbar(Snackbar,4000,{message:"", duration: 4000, onCloseClick:handleSnackbarHideClick});
  
  const handleSnackbarShowClick = useCallback((newProps) => {
    setSnackbarOptions({...snackbarOptions, ...newProps})
    setIsSnackbarVisible(true);
  }, [setSnackbarOptions,setIsSnackbarVisible,snackbarOptions]);

  return (
    <div style={{flexDirection:"column"}}>
      {snackbarifyContainer}
      <button style={{padding: "20px"}} 
        onClick={()=>handleSnackbarShowClick({message: "데이터가 성공적으로 저장되었습니다.",type:"success"})}>
        Show Success ✅ 
      </button>
      <button style={{padding: "20px"}}
        onClick={()=>handleSnackbarShowClick({message: "일시적으로 데이터 저장에 실패하였습니다.",type:"error"})}>
				Show Error ❌ 
      </button>
      <button style={{padding: "20px"}}
        onClick={()=>handleSnackbarShowClick({message: "이거슨 정보입니다. 정보정보",type:"information"})}>
				Show Information 🔵 
      </button>
      <button style={{padding: "20px"}}
        onClick={()=>handleSnackbarShowClick({message: "경고경고",type:"warning"})}>
				Show Warning ⚠️ 
      </button>
      <button style={{padding: "20px"}} onClick={handleSnackbarHideClick}>
				Hide Snackbar
      </button>
      {snackbarifyContainer}
    </div>
  );
};

export default SnackbarTestPage;
