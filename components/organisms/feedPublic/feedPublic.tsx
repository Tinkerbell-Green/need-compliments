import React from "react";
import * as S from "./feedPublic.styled";
import {FeedItem} from "components/moleculs/feedItem"
import {TaskData,GoalData} from "stores/data";

type FeedPublicProps = {
};

export const FeedPublic = ({
}: FeedPublicProps) => {
  return (
    <S.Feed>
      <FeedItem />
      <FeedItem />
      <FeedItem />
    </S.Feed>
  );
};
