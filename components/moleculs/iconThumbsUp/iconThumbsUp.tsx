import {HandThumbsUpFill} from "@styled-icons/bootstrap";
import * as S from "./iconThumbsUp.styled"

type IconThumbsUpProps = {
  clicked: boolean;
}

export const IconThumbsUp = ({clicked}:IconThumbsUpProps) => {
  return (
    <div>
      <S.Icon><HandThumbsUpFill size={22}/></S.Icon>
      <div>
        <S.Bubble1 clicked={clicked}><HandThumbsUpFill size={20}/></S.Bubble1>
        <S.Bubble2 clicked={clicked}><HandThumbsUpFill size={20}/></S.Bubble2>
        <S.Bubble3 clicked={clicked}><HandThumbsUpFill size={20}/></S.Bubble3>
        <S.Bubble4 clicked={clicked}><HandThumbsUpFill size={20}/></S.Bubble4>
        <S.Bubble5 clicked={clicked}><HandThumbsUpFill size={20}/></S.Bubble5>
      </div>
    </div>
  );
}