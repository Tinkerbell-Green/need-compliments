import React from "react";
import * as S from "./feedPublic.styled";
import {FeedItem} from "components/moleculs/feedItem"
import {GoalData, TaskData} from "stores/data";

type FeedPublicProps = {
  tasksAndGoals: {task: TaskData, goal: GoalData}[];
};

export const FeedPublic = ({
  tasksAndGoals,
}: FeedPublicProps) => {
  return (
    <S.Feed>
      {(tasksAndGoals).map(item => (
        <FeedItem key={item.task.id} task={item.task} goal={item.goal}></FeedItem>
      ))}
    </S.Feed>
  );
};
