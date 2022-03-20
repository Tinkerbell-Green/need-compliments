import {PlusSm} from "@styled-icons/heroicons-outline";
import React from "react";
import * as S from "./chip.styled";
import {GoalColor} from "stores/data/types";

type ChipProps = {
  children?: React.ReactNode;
  label: string;
  color?: GoalColor;
  icon?: React.ReactNode;
  onAdd?: ()=>void;
};

export const Chip = ({
  children,
  label,
  color = "white",
  icon,
  onAdd,
}: ChipProps) => {
  return (
    <S.Chip>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Label color={color}>{label}</S.Label>
      {onAdd && (
        <S.AddIcon onClick={()=>onAdd()}>
          <PlusSm/>
        </S.AddIcon>
      )}
      {children}
    </S.Chip>
  );
};
