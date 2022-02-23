import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    color: #ffffff;
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

  button {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }
`