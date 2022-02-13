import {useCallback, FunctionComponent} from "react"
import styled from "styled-components"
import {Color} from "pages/practice"

export type ColorButtonProps = {
  color: Color
  isSelected: boolean
  onClick: (value: Color) => void
}

const StyledButton = styled.button<{isSelected: boolean}>`
  width: auto;
  border-width: ${props => props.isSelected ? "4px" : "1px"};
`

export const ColorButton: FunctionComponent<ColorButtonProps> = ({
  color,
  isSelected,
  onClick,
}) => {

  const handleClick = useCallback(() => {
    onClick(color) // 부모로 부터 전달받은걸 이용

    if (color === "blue"){
      console.log("sky")
    }
    else if (color === "green"){
      console.log("grass")
    }
    else if (color === "red"){
      console.log("fire")
    }
  },[color, onClick])

  return (
    <StyledButton onClick={handleClick} isSelected={isSelected}>{color}</StyledButton> 
  )
}