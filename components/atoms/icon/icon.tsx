import * as S from "./icon.styled"

type IconProps = {
  children:React.ReactNode,
  onClick?: React.MouseEventHandler
  color?: string;
  rotate?: boolean;
}

export const Icon = ({children, onClick, color="", rotate=false}:IconProps) => {
  return (
    <S.Icon color={color} rotate={rotate} onClick={onClick && onClick}>
      {children}
    </S.Icon>
  );
}
