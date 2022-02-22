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

  div, section, header, footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`