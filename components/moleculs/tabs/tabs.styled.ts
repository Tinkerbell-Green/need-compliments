import styled from "styled-components";

export const Tabs = styled.div`
width: 100%;
margin-bottom: 14px;
border-bottom: 0.8px solid gray;
`;

export const Tab = styled.button<{clicked:boolean}>`
font-size: 1rem;
font-weight: 600;
border-bottom: 2.5px solid transparent;
padding:10px;
border-bottom-color: ${props => props.clicked && "white"};
transition: border-color 0.3s ease-out;
`;
