import {ComplimentData,ComplimentType} from "api"
import {ComplimentButton} from "components/atoms/complimentButton";
import {ComplimentsCounter} from "components/moleculs/complimentsCounter";
import * as S from "components/moleculs/feedItem/feedItem.styled";

const ComplimentTypes:ComplimentType[] = ["clapping-hands","party-popper","red-heart","thumbs-up"]

type FeedItemComplimentProps = {
  compliments: ComplimentData[],
  onEmojiClick: (emoji: ComplimentData["type"]) => void;
  clickedType: ComplimentType | null,
}

export const FeedItemCompliment = ({compliments, onEmojiClick,clickedType}:FeedItemComplimentProps) => {
  return (
    <S.ComplimentList>
      {ComplimentTypes.map((type)=>(
        <ComplimentButton 
          key={type}
          type={type}
          clicked={clickedType ? clickedType===type : false}
          onClick={onEmojiClick}></ComplimentButton>
      ))}
      <ComplimentsCounter compliments={compliments}></ComplimentsCounter>
    </S.ComplimentList>
  )
}