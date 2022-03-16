import {PlusSm} from "@styled-icons/heroicons-outline";
import React from "react";
import * as S from "./chip.styled";

type ChipProps = {
  children?: React.ReactNode;
  id:string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  onAdd?: (value: string)=>void;
};

export const Chip = ({
  children,
  id,
  label,
  color = "#ffffff",
  icon,
  onAdd,
}: ChipProps) => {
  return (
    <S.Chip>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Label color={color}>{label}</S.Label>
      {onAdd && (
        <S.AddIcon onClick={()=>onAdd(id)}>
          <PlusSm/>
        </S.AddIcon>
      )}
      {children}
    </S.Chip>
  );
};
