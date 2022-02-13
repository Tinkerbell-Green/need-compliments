import type {NextPage} from "next"
import {useCallback, useEffect, useMemo, useState} from "react"
import styled from "styled-components"
import { ColorButton } from "./components/ColorButton/ColorButton"

const PracticeContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export type Color = "blue" | "red" | "green"

const Practice: NextPage = () => {
  const [selectedColor, setSelectedColor] = useState<Color>("red")
  const [changeCount, setChangeCount] = useState(0)

  const onClickColorButton = useCallback((color: Color) => {
    setSelectedColor(color)
  },[])

  useEffect(()=>{
    setChangeCount(prev => prev + 1)
  },[selectedColor])

  const selectedColorLength = useMemo(()=>{
    return selectedColor.length
  },[selectedColor.length])

  return (
    <PracticeContainer>
      <div>{`my favorite color is ${selectedColor}`}</div>
      <div>{`change count: ${changeCount}`}</div>
      <div>{`length of color text: ${selectedColorLength}`}</div>
      {(["blue", "red", "green"] as Color[]).map(color => (
        <ColorButton key={`color-button-${color}`} color={color} isSelected={selectedColor === color} onClick={onClickColorButton} />
      ))}
    </PracticeContainer>   
  )
}

export default Practice