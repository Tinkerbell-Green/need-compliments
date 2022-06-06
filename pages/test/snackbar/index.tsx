import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar} from "components/atoms/snackbar";
import {useSnackbar} from "utils/snackbarify/snackbarHooks";
import {SnackbarifyContainer} from "utils/snackbarify/snackbarifyContainer";

const SnackbarTestPage: NextPage = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useSnackbar();
  
  const handleSnackbarShowClick = useCallback(() => {
    setIsSnackbarVisible(true);
  }, [setIsSnackbarVisible]);

  const handleSnackbarHideClick = useCallback(() => {
    setIsSnackbarVisible(false);
  }, [setIsSnackbarVisible]);

  const snackbar = useCallback(() => (
    <Snackbar
      message="데이터가 초콜릿입니다."
      duration={4000}
      onCloseClick={handleSnackbarHideClick}
    />
  ),[handleSnackbarHideClick])

  return (
    <div>
      {snackbar()}
      <button style={{margin: "150px 20px"}} onClick={handleSnackbarShowClick}>
				SHOW SNACKBAR
      </button>
      <button style={{margin: "150px 20px"}} onClick={handleSnackbarHideClick}>
				HIDE SNACKBAR
      </button>
      <SnackbarifyContainer
        visible={isSnackbarVisible}
        duration={4000}
        Snackbar={snackbar}
      ></SnackbarifyContainer>
    </div>
  );
};

export default SnackbarTestPage;
