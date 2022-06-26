import {GoalData} from "api"
import {Chip} from "components/atoms/chip";
import * as S from "components/moleculs/feedItem/feedItem.styled";

type FeedItemGoalProps = {
  goal: GoalData,
}

export const FeedItemGoal = ({goal}:FeedItemGoalProps) => {
  return (
    <S.Goal><Chip label={goal.name || ""} color={goal.color || "white"}></Chip></S.Goal>
  )
}