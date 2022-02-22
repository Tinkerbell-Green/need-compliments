import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
  }
`