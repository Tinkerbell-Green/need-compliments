import {createContext} from "react";
import {useSnackbarHooks} from "utils/snackbarify";

export type snackbarifyType = ReturnType<typeof useSnackbarHooks>;

type Props = {
  children:React.ReactNode
}

export const SnackbarifyContext = createContext<snackbarifyType | null>(null);

export const SnackbarifyProvider = ({children}:Props) => {
  const {isSnackbarVisible, setIsSnackbarVisible,
    snackbarDuration, setSnackbarDuration,SnackbarComponent,setSnackbar} = useSnackbarHooks();

  console.log(isSnackbarVisible)
  return (
    <SnackbarifyContext.Provider value={{
      isSnackbarVisible, setIsSnackbarVisible,
      snackbarDuration, setSnackbarDuration,
      SnackbarComponent,setSnackbar}}>
      {children}
    </SnackbarifyContext.Provider>
  )
}

// https://react.vlpt.us/using-typescript/04-ts-context.html
// https://blog.logrocket.com/how-to-use-react-context-typescript/