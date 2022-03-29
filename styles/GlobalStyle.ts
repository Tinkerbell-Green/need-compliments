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
    scroll-behavior: smooth;
  }

  div, section, header, footer {
    display: flex;
  }

  button {
    border:none;
    background: none;
    box-shadow: none;
    cursor: pointer;
  }

  :focus-visible{
  outline: 3px dotted #B9AAFF;
  }
  
  a{
    text-decoration: none;
  }

  input {
    border:none;
  }

  svg, path{
    color: inherit;
    width: inherit;
    height: inherit;
  }
`