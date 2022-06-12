import {createContext,useContext} from "react";
import {useSnackbarHooks} from "utils/snackbarify";

type Props = {
  children:React.ReactNode
}

export type snackbarifyType = ReturnType<typeof useSnackbarHooks>;
export const SnackbarifyContext = createContext<snackbarifyType | null>(null);

export const SnackbarifyProvider =  <snackbarPropsType extends {}>({children}:Props) => {
  const {
    isSnackbarVisible, 
    setIsSnackbarVisible,
    snackbarDuration, 
    setSnackbarDuration,
    snackbarProps,
    setSnackbarProps,
  } = useSnackbarHooks<snackbarPropsType>();

  return (
    <SnackbarifyContext.Provider value={{
      isSnackbarVisible, setIsSnackbarVisible,
      snackbarDuration, setSnackbarDuration,
      snackbarProps,setSnackbarProps} as snackbarifyType}>
      {children}
    </SnackbarifyContext.Provider>
  )
}

export const useSnackbarifyState = () => {
  const state = useContext(SnackbarifyContext);
  if (!state) throw new Error("Cannot find SnackbarifyProvider");
  return state;
}

// https://react.vlpt.us/using-typescript/04-ts-context.html
// https://blog.logrocket.com/how-to-use-react-context-typescript/