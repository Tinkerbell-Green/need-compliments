import {PlusSm} from "@styled-icons/heroicons-outline";
import React from "react";
import * as S from "./chip.styled";

type ChipProps = {
  children?: React.ReactNode;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  onAdd?: ()=>void;
  onClick? : () => void;
};

export const Chip = ({
  children,
  label,
  color = "#ffffff",
  icon,
  onAdd,
  onClick
}: ChipProps) => {
  return (
    <S.Chip clickable={!!onClick} onClick={onClick && onClick}>
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
