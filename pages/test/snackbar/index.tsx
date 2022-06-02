import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar} from "components/atoms/snackbar";
import {SnackbarAnimation} from "components/moleculs/snackbarAnimation";
import {useSnackbar} from "utils/snackbarify/snackbarHook";

const SnackbarTestPage: NextPage = () => {
  const {isSnackbarVisible, setIsSnackbarVisible, snackbarDuration} =
		useSnackbar();

  const onSnackbarShowClick = useCallback(() => {
    setIsSnackbarVisible({visible: true});
  }, [setIsSnackbarVisible]);

  const onSnackbarHideClick = useCallback(() => {
    setIsSnackbarVisible({visible: false});
  }, [setIsSnackbarVisible]);

  return (
    <>
      <SnackbarAnimation
        visible={isSnackbarVisible}
        Snackbar={() => (
          <Snackbar
            message="This is snackbar!"
            type="information"
            duration={snackbarDuration}
            onCloseClick={onSnackbarHideClick}
          ></Snackbar>
        )}
      ></SnackbarAnimation>
      <button style={{margin: "150px 20px"}} onClick={onSnackbarShowClick}>
				SHOW SNACKBAR
      </button>
      <button style={{margin: "150px 20px"}} onClick={onSnackbarHideClick}>
				HIDE SNACKBAR
      </button>
    </>
  );
};

export default SnackbarTestPage;
