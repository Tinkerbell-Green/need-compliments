import {PlusSm} from "@styled-icons/heroicons-outline";
import React,{useState,useCallback} from "react";
import * as S from "./chip.styled";
import {GoalColor} from "apis";

type ChipProps = {
  children?: React.ReactNode;
  label: string;
  color?: GoalColor;
  icon?: React.ReactNode;
  onAdd?: ()=>void;
  onClick? : () => void;
};

export const Chip = ({
  children,
  label,
  color = "white",
  icon,
  onAdd,
  onClick
}: ChipProps) => {
  const [addTimer, setAddTimer] = useState<NodeJS.Timeout>();

  const handleAdd = useCallback((()=>{
    if(!onAdd) return;
    addTimer && clearTimeout(addTimer);

    const newTimer = setTimeout(onAdd,250);
    setAddTimer(newTimer);
  }),[addTimer,onAdd]);

  return (
    <S.Chip 
      tabIndex={!!onClick ? 0 : -1}
      clickable={!!onClick} 
      onClick={onClick && onClick}>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Label color={color}>{label}</S.Label>
      {onAdd && (
        <S.AddIcon onClick={handleAdd} aria-label={"추가하기"}>
          <PlusSm/>
        </S.AddIcon>
      )}
      {children}
    </S.Chip>
  );
};
