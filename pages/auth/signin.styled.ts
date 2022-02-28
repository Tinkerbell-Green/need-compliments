import Image from "next/image";
import styled from "styled-components"

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
    cursor: pointer;

    > span{
        font-size: 1rem;
    }
`

export const NaverBtn = styled(LogoBtn)`
    background: #1BC74A;
`
export const KakaoBtn = styled(LogoBtn)`
    background: #1BC74A;
`
export const GoogleBtn = styled(LogoBtn)`
    background: #1BC74A;
`
export const AppleBtn = styled(LogoBtn)`
    background: #1BC74A;
`