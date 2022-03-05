import styled from "styled-components";

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