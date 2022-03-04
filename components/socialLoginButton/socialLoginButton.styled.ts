import styled from "styled-components";

const NAVER_BACKGROUND_COLOR = "#1BC64A";
const KAKAO_BACKGROUND_COLOR = "#F9DE38";
const KAKAO_FONT_COLOR = "#3B1C1D";
const GOOGLE_BACKGROUND_COLOR = "#ffffff";
const GOOGLE_FONT_COLOR = "#000000";
const FACEBOOK_BACKGROUND_COLOR = "#197BED";

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18vw;
    height:4rem;
    min-width: 300px;
    max-height: 80px;
    border-radius: 5px;
    margin-bottom: 0.8rem;
    cursor: pointer;
    /* background: ${({ name }) => }; */

    > span{
        font-size: 1rem;
        /* color: ${props => props.fontColor}; */
    }
`