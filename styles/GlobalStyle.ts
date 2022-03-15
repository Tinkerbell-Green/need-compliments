import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    color: ${props => props.theme.colors["gray-100"]}
  }

  html {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
  }

  div, section, header, footer {
    display: flex;
  }

  button {
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
    cursor: pointer;
  }

  svg, path{
    color: inherit;
  }
`