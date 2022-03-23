import styled from "styled-components";

<<<<<<< HEAD
export const SubHeadingButton = styled.button`
display: flex;
justify-content: space-between;
width: 100%;
color: ${props => props.theme.colors["gray-400"]};
=======
export const SubHeadingButton = styled.button<{ status: "default" | "error" }>`
color: ${props => props.status === "error" ? props.theme.colors["rose-500"] : props.theme.colors["gray-400"]};
>>>>>>> 3f2ed7486942e80b560e0a3667039ed321b3ecd6
padding: 0.8rem 0 0.8rem 0;
font-size: 0.8rem;
`