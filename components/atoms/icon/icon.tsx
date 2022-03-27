import * as S from "./icon.styled"

type IconProps = {
  children:React.ReactNode,
  color?: string;
  rotate?: boolean;
}

export const Icon = ({children, color="", rotate}:IconProps) => {
  return (
    <S.Icon tabIndex={0} color={color} rotate={rotate ? rotate : false}>
      {children}
    </S.Icon>
  );
}
