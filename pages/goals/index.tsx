import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {LayoutNavigation} from "components/layout-navigation";
import {Chip} from "components/chip";

const GoalsPage: NextPage = () => {
  const router = useRouter();
  const [goals, setGoals] = useState(["Algorithm", "Personal"]); //TODO: 지우기
  const [goalsColor, setGoalsColor] = useState(["orange", "blueviolet"]); //TODO: 지우기

  const onClick = () => {
    router.push("/");
  };

  return (
    <LayoutNavigation
      title="목표"
      rightButtonText="+"
      onLeftButtonClick={onClick}
    >
      {goals.map((value, index) => (
        <Chip
          key={index}
          label={value}
          color={goalsColor[index]}
          onAdd={() => console.log(`${value} clicked`)}
        ></Chip>
      ))}
    </LayoutNavigation>
  );
};

export default GoalsPage;
