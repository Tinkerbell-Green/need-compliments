import * as S from "./icon.styled"

type IconProps = {
  children:React.ReactNode,
  onClick?:React.MouseEventHandler,
  color?: string;
  rotate?: boolean;
}

export const Icon = ({children,onClick, color="", rotate}:IconProps) => {
  return (
    <S.Icon tabIndex={0} color={color} rotate={rotate ? rotate : false} onClick={onClick && onClick}>
      {children}
    </S.Icon>
  );
}
