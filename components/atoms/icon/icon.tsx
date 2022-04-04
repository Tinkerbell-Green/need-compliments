import * as S from "./icon.styled"

type IconProps = {
  children:React.ReactNode,
  size?:number,
  color?: string;
  isRotate?: boolean;
}

export const Icon = ({children, size, color="", isRotate=false}:IconProps) => {
  return (
    <S.Icon 
      color={color} 
      isRotate={isRotate} 
      size={size && size}
      role="img">
      {children}
    </S.Icon>
  );
}
