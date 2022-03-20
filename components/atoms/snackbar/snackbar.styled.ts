import styled from "styled-components";

export const Container = styled.section<{color:string,isVisible:boolean}>`
position: fixed;
top: 8%;
left: 50%;
display: flex;
background-color: ${props => props.color};
border-radius: 4px;
align-items: center;
padding: 15px 10px;
transition: all 0.3s ease-out;

visibility: ${props=>props.isVisible ? "visible" : "hidden"};
transform: ${props=>props.isVisible ? "translate(-50%, -50%);" : "translate(-50%, -300%);"};
`;

export const Icon = styled.div`
width: 22px;
height:22px;
margin: 0 5px;
`;

export const Label = styled.p`
margin: 0 5px;
`;

export const Button = styled.button`
width: 22px;
height:22px;
padding:0;
margin: 0 5px;
border-radius: 50%;
cursor: pointer;
`;