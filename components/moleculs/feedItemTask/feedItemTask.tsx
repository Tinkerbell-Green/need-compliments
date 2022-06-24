import * as S from "components/moleculs/feedItem/feedItem.styled";

type FeedItemTaskProps = {
  title:string,
}

export const FeedItemTask = ({title}:FeedItemTaskProps) => {
  return (
    <S.Task>{title}</S.Task>
  )
}