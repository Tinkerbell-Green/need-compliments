import {ComplimentData,ComplimentType} from "api"
import {ReactionButton} from "components/atoms/reactionButton";
import * as S from "components/moleculs/feedItem/feedItem.styled";

const ComplimentTypes:ComplimentType[] = ["clapping-hands","party-popper","red-heart","thumbs-up"]

type FeedItemReactionListProps = {
  onEmojiClick: (emoji: ComplimentData["type"]) => void;
  complimentsNumber: number,
  clickedType: ComplimentType | null,
}

export const FeedItemReactionList = ({onEmojiClick,complimentsNumber,clickedType}:FeedItemReactionListProps) => {
  return (
    <S.ReactionList>
      {ComplimentTypes.map((type)=>(
        <ReactionButton 
          key={type}
          type={type}
          clicked={clickedType ? clickedType===type : false}
          onClickEmoji={onEmojiClick}></ReactionButton>
      ))}
      <S.Count>{complimentsNumber}</S.Count>
    </S.ReactionList>
  )
}