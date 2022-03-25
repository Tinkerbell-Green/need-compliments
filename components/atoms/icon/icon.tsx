import * as S from "./icon.styled"

type IconProps = {
  children:React.ReactNode,
  color?: string;
  rotate?: boolean;
}

export const Icon = ({children, color="white", rotate=false}:IconProps) => {
  return (
    <S.Icon color={color} rotate={rotate}>
      {children}
    </S.Icon>
  );
}
