import {PlusSm} from "@styled-icons/heroicons-outline";
import React,{useState} from "react";
import * as S from "./chip.styled";
import {GoalColor} from "stores/data/types";

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

  const handleAdd = (()=>{
    if(!onAdd) return;
    addTimer && clearTimeout(addTimer);

    const newTimer = setTimeout(onAdd,400);
    setAddTimer(newTimer);
  })

  return (
    <S.Chip clickable={!!onClick} onClick={onClick && onClick}>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Label color={color}>{label}</S.Label>
      {onAdd && (
        <S.AddIcon onClick={handleAdd}>
          <PlusSm/>
        </S.AddIcon>
      )}
      {children}
    </S.Chip>
  );
};
