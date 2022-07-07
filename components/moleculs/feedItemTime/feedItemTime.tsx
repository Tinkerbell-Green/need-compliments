import {TaskData} from "apis"
import * as S from "components/moleculs/feedItem/feedItem.styled";
import {Dayjs} from "utils/dayjs"

type FeedItemTimeProps = {
  task: TaskData,
}

export const FeedItemTime = ({task}:FeedItemTimeProps) => {
  return (
    <S.Li>{Dayjs(task.createdAt).format("MM/DD HH:mm")}</S.Li>
  )
}