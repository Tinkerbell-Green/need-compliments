import type {AppProps} from "next/app"
import {Provider as ReduxProvider} from "react-redux";
import {store} from "store";
import {ThemeProvider} from "styled-components"
import {GlobalStyle} from "styles/GlobalStyle";
import {themes} from "styles/theme";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={themes.light}>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default MyApp