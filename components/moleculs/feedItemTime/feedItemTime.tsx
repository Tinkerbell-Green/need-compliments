import * as S from "components/moleculs/feedItem/feedItem.styled";
import {Dayjs} from "utils/dayjs"

type FeedItemTimeProps = {
  time: number,
}

export const FeedItemTime = ({time}:FeedItemTimeProps) => {
  return (
    <S.Li>{Dayjs(time).format("MM/DD HH:mm")}</S.Li>
  )
}