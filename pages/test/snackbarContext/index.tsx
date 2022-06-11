import {NextPage} from "next";
import {useCallback,useState,useEffect,useContext} from "react";
import {Snackbar,SnackbarProps} from "components/atoms/snackbar"
import {SnackbarifyContext,snackbarifyType,Snackbarify} from "utils/snackbarify";

const SnackbarContextTestPage: NextPage = () => {
  const {setIsSnackbarVisible, setSnackbar} = useContext(SnackbarifyContext) as snackbarifyType;

  const [snackbarProps,setSnackbarProps] = useState<SnackbarProps>({
    message:"처음정보정보", 
    type: "information"
  })

  useEffect(()=>{
    setSnackbar(()=><Snackbar {...snackbarProps}/>);
  },[snackbarProps,setSnackbar,setIsSnackbarVisible]);
  
  const handleSnackbarChange = useCallback((newProps) => {
    setSnackbarProps((state)=>({...state,...newProps}));
    setIsSnackbarVisible(true);
  }, [setSnackbarProps,setIsSnackbarVisible]);

  return (<>
    <Snackbarify/>
    {/* {Snackbarify()} */}
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
