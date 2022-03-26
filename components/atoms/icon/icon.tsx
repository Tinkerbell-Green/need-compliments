import * as S from "./icon.styled"

type IconProps = {
  children:React.ReactNode,
  onClick?: React.MouseEventHandler
  color?: string;
  rotate?: boolean;
  bubble?: boolean;
}

export const Icon = ({children, onClick, color="", rotate=false, bubble=false}:IconProps) => {
  return (
    <S.Icon color={color} rotate={rotate} bubble={bubble} onClick={onClick && onClick}>
      {children}
    </S.Icon>
  );
}
