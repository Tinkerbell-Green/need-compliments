<<<<<<< HEAD
import {SessionProvider} from "next-auth/react";
import type {AppProps} from "next/app";
import {ThemeProvider} from "styled-components";
=======
import type {AppProps} from "next/app"
import {ThemeProvider} from "styled-components"
import {wrapper} from "stores";
>>>>>>> f34e9030e031982cfd6bdfeef5a98d487e91182b
import {GlobalStyle} from "styles/GlobalStyle";
import {themes} from "styles/theme";
import "utils/firebase";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={themes.dark}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

<<<<<<< HEAD
export default MyApp;
=======
export default wrapper.withRedux(MyApp);
>>>>>>> f34e9030e031982cfd6bdfeef5a98d487e91182b
