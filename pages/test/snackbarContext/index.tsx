import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar,SnackbarProps} from "components/atoms/snackbar"
import {useSnackbarifyState,Snackbarify} from "utils/snackbarify";

const SnackbarContextTestPage: NextPage = () => {
  const {setIsSnackbarVisible,setSnackbarProps} = useSnackbarifyState();
  
  const handleSnackbarChange = useCallback((newProps?) => {
    setSnackbarProps((state)=>{
      const newState:SnackbarProps = state ? {...state,...newProps} : newProps;
      return newState;
    });
    setIsSnackbarVisible(true);
  }, [setSnackbarProps,setIsSnackbarVisible]);

  return (<>
    <Snackbarify Snackbar={Snackbar}/>
    <div style={{flexDirection:"column"}}>
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
    </div>
  </>
  );
};

export default SnackbarContextTestPage;
