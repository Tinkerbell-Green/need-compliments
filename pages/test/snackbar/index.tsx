import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar} from "components/atoms/snackbar";
import {Snackbarify} from "components/moleculs/snackbarify";
import {useSnackbar,useSnackbarDuration} from "utils/snackbarify/snackbarHooks";

const SnackbarTestPage: NextPage = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] =
		useSnackbar();
  const [snackbarDuration, setSnackbarDuration] = useSnackbarDuration();

  const onSnackbarShowClick = useCallback(() => {
    setIsSnackbarVisible({value: true});
  }, [setIsSnackbarVisible]);

  const onSnackbarHideClick = useCallback(() => {
    setIsSnackbarVisible({value: false});
  }, [setIsSnackbarVisible]);

  return (
    <div>
      <Snackbarify
        visible={isSnackbarVisible}
        Snackbar={() => (
          <Snackbar
            message="메세지입니다."
            type="information"
            duration={snackbarDuration}
            onCloseClick={onSnackbarHideClick}
          ></Snackbar>
        )}
      ></Snackbarify>
      <button style={{margin: "150px 20px"}} onClick={onSnackbarShowClick}>
				SHOW SNACKBAR
      </button>
      <button style={{margin: "150px 20px"}} onClick={onSnackbarHideClick}>
				HIDE SNACKBAR
      </button>
    </div>
  );
};

export default SnackbarTestPage;
