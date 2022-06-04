import {NextPage} from "next";
import {useCallback} from "react";
import {Snackbar} from "components/atoms/snackbar";
import {useSnackbar} from "utils/snackbarify/snackbarHooks";
import {SnackbarifyContainer} from "utils/snackbarify/snackbarifyContainer";

const SnackbarTestPage: NextPage = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useSnackbar();
  const snackbar = () => (
    <Snackbar
      message="Snackbarify 🍫"
      duration={4000}
      onCloseClick={onSnackbarHideClick}
    />
  )

  const onSnackbarShowClick = useCallback(() => {
    setIsSnackbarVisible({value: true});
  }, [setIsSnackbarVisible]);

  const onSnackbarHideClick = useCallback(() => {
    setIsSnackbarVisible({value: false});
  }, [setIsSnackbarVisible]);

  return (
    <div>
      {snackbar()}
      <button style={{margin: "150px 20px"}} onClick={onSnackbarShowClick}>
				SHOW SNACKBAR
      </button>
      <button style={{margin: "150px 20px"}} onClick={onSnackbarHideClick}>
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
