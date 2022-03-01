import type {AppProps} from "next/app"
import {ThemeProvider} from "styled-components"
import {GlobalStyle} from "styles/GlobalStyle";
import {themes} from "styles/theme";
import "utils/firebase";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={themes.dark}>
      <GlobalStyle/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp