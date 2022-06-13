import React from "react";
import * as S from "./feedPublic.styled";
import {GetTasksData} from "api"
import {FeedItem} from "components/moleculs/feedItem"

type FeedPublicProps = {
  tasks: GetTasksData["tasks"];
};

export const FeedPublic = ({
  tasks,
}: FeedPublicProps) => {
  return (
    <S.Feed>
      {(tasks || []).map(item => (
        <FeedItem key={item._id} task={item} goal={item.goalData}></FeedItem>
      ))}
    </S.Feed>
  );
};
