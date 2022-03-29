import * as S from "./icon.styled"

type IconProps = {
  children:React.ReactNode,
  color?: string;
  isRotate?: boolean;
}

export const Icon = ({children, color="", isRotate=false}:IconProps) => {
  return (
    <S.Icon color={color} isRotate={isRotate}>
      {children}
    </S.Icon>
  );
}
