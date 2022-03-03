import Image from "next/image";
import styled from "styled-components"

const NAVER_BACKGROUND_COLOR = "#1BC64A";
const KAKAO_BACKGROUND_COLOR = "#F9DE38";
const KAKAO_FONT_COLOR = "#3B1C1D";
const GOOGLE_BACKGROUND_COLOR = "#ffffff";
const GOOGLE_FONT_COLOR = "#000000";
const FACEBOOK_BACKGROUND_COLOR = "#197BED";

export const Container = styled.div`
    background-color: ${props => props.theme.colors.black};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StyledImage = styled(Image)`
/* border-radius: 50%; */
`

export const LogoBtn = styled.button`
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

    > span{
        font-size: 1rem;
    }
`

export const NaverBtn = styled(LogoBtn)`
    background: ${NAVER_BACKGROUND_COLOR};
`

export const KakaoBtn = styled(LogoBtn)`
    background: ${KAKAO_BACKGROUND_COLOR};
    
    > span{
        color: ${KAKAO_FONT_COLOR};
    }
`

export const GoogleBtn = styled(LogoBtn)`
    background: ${GOOGLE_BACKGROUND_COLOR};

    >span{
        color:${GOOGLE_FONT_COLOR};
    }
`

export const FacebookBtn = styled(LogoBtn)`
    background: ${FACEBOOK_BACKGROUND_COLOR};
`
