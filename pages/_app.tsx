import {SessionProvider} from "next-auth/react";
import {DefaultSeo} from "next-seo";
import type {AppProps} from "next/app";
import {ThemeProvider} from "styled-components";
import {wrapper} from "stores";
import {GlobalStyle} from "styles/GlobalStyle";
import {themes} from "styles/theme";
import {AuthenticationProvider} from "utils/authentication";
import {AuthorizationProvider} from "utils/authorization";
import "utils/firebase"; 

const DEFAULT_SEO = {
  title: "칭찬이 필요해 | 나의 일상이 칭찬거리가 되는 선순환 커뮤니티",
  description: "매일 모든 나의 일상을 칭찬하고 사람들과 공유해보세요. 당연한 일도 모두 칭찬거리가 될 수 있어요.",
  canonical: "https://need-compliments-sandy.vercel.app",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://need-compliments-sandy.vercel.app",
    title: "칭찬이 필요해 | 나의 일상이 칭찬거리가 되는 선순환 커뮤니티",
    site_name: "칭찬이 필요해",
    images: [
      {
        url:"https://www.canva.com/design/DAE8MQOClkw/view?utm_content=DAE8MQOClkw&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
        width: 160,
        height: 80,
        alt: "칭찬이필요해 이미지"
      }
    ]
  },
};

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthenticationProvider>
        <ThemeProvider theme={themes.dark}>
          <GlobalStyle />
          <AuthorizationProvider>
            <DefaultSeo  {...DEFAULT_SEO}/>
            <Component {...pageProps}/>
          </AuthorizationProvider>
        </ThemeProvider>
      </AuthenticationProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
