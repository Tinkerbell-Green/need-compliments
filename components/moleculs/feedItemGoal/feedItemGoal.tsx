import {GoalData} from "api"
import {Chip} from "components/atoms/chip";
import * as S from "components/moleculs/feedItem/feedItem.styled";

type FeedItemGoalProps = {
  label: string,
  color: GoalData["color"]
}

export const FeedItemGoal = ({label, color}:FeedItemGoalProps) => {
  return (
    <S.Goal><Chip label={label} color={color}></Chip></S.Goal>
  )
}