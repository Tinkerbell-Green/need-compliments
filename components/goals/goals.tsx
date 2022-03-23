import React, {useState} from "react";
import {Chip} from "components/atoms/chip";
import {SubHeadingSpan} from "components/subHeading/subHeadingSpan";

export const Goals = () => {
  const [goals, setGoals] = useState(["Algorithm", "Personal"]); //TODO: 지우기
  const [goalsColor, setGoalsColor] = useState(["orange", "blueviolet"]); //TODO: 지우기

  return (
    <>
      <S.SubHeadingContainer>
        <SubHeadingSpan>일반</SubHeadingSpan>
      </S.SubHeadingContainer>

      <S.FeedContents>
        {goals.map((value, index) => (
          <Chip key={index} id={value} label={value} color={goalsColor[index]}></Chip>
        ))}
      </S.FeedContents>
    </>
  );
};
