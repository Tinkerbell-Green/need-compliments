import styled from "styled-components";

export const SubHeadingButton = styled.button<{ status: "default" | "error" }>`
color: ${props => props.status === "error" ? props.theme.colors["rose-500"] : props.theme.colors["gray-400"]};
padding: 0.8rem 0 0.8rem 0;
font-size: 0.8rem;
`