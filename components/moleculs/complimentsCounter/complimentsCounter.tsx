import {ComplimentData} from "api"
import * as S from "components/moleculs/feedItem/feedItem.styled";

type ComplimentsCounterProps = {
  compliments: ComplimentData[],
}

export const ComplimentsCounter = ({compliments}:ComplimentsCounterProps) => {
  return (
    <S.Count>{compliments.length}</S.Count>
  )
}