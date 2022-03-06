import {PlusSm} from "@styled-icons/heroicons-outline";
import React from "react";
import * as S from "./chip.styled";

type ChipProps = {
  children?: React.ReactNode;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  onAdd?: React.MouseEventHandler;
};

export const Chip = ({
  children,
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
        <S.AddIcon onClick={onAdd}>
          <PlusSm />
        </S.AddIcon>
      )}
      {children}
    </S.Chip>
  );
};
