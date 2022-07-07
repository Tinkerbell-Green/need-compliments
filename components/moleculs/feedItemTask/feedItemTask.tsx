import {TaskData} from "apis"
import * as S from "components/moleculs/feedItem/feedItem.styled";

type FeedItemTaskProps = {
  task: TaskData
}

export const FeedItemTask = ({task}:FeedItemTaskProps) => {
  return (
    <S.Task>{task.title}</S.Task>
  )
}