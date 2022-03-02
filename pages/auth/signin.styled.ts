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
    margin-bottom: 0.8rem;
    cursor: pointer;

    > span{
        font-size: 1rem;
    }
`

export const NaverBtn = styled(LogoBtn)`
    background: #1BC64A;
`

export const KakaoBtn = styled(LogoBtn)`
    background: #F9DE38;
    
    > span{
        color: #3B1C1D;
    }
`

export const AppleBtn = styled(LogoBtn)`
    background: #ffffff;

    >span{
        color:#000000;
    }
`

export const FacebookBtn = styled(LogoBtn)`
    background: #197BED;
`
