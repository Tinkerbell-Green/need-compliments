import * as S from "components/moleculs/feedItem/feedItem.styled";

type ComplimentsCounterProps = {
  complimentsCount: number,
}

export const ComplimentsCounter = ({complimentsCount}:ComplimentsCounterProps) => {
  return (
    <S.Count>{complimentsCount}</S.Count>
  )
}