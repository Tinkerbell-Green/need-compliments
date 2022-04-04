import React, {useCallback, useEffect, useMemo, useState} from "react";
import * as S from "./goalsForm.styled";
import {SubHeadingSpan} from "components/atoms/subHeadingSpan";
import {ListRadio, ListRadioProps} from "components/moleculs/listRadio";
import {GoalColor, GoalData} from "stores/data";
import {themes as T} from "styles/theme";

type GoalsFormProps = {
  goal?: GoalData;
  onChangeGoalName: (name: string) => void;
  onChangeGoalColor: (color: GoalColor) => void;
  goalPrivacy: GoalData["readPermission"]
  onChangeGoalPrivacy: (color: GoalData["readPermission"]) => void;
};

export const GoalsForm = ({
  goal,
  onChangeGoalName,
  onChangeGoalColor,
  goalPrivacy,
  onChangeGoalPrivacy,
}: GoalsFormProps) => {
  const [clickedGoalColor, setClickedGoalColor] = useState<GoalColor>("white");
  
  const publicSettingOptions: ListRadioProps<GoalData["readPermission"]>["data"] = useMemo(()=>[
    {
      value: "everyone",
      title: "전체공개",
      publicBookIcon: "public",
    },
    // WIP: revert when friend feature is ready
    // {
    //   id: 1,
    //   title: "일부공개",
    //   publicBookIcon: "protected",
    // },
    {
      value: "me",
      title: "나만보기",
      publicBookIcon: "private",
    },
    {
      value: "none",
      title: "숨기기",
      publicBookIcon: "private",
    },
  ],[]);

  const runningOptions: ListRadioProps["data"] = useMemo(()=>[
    {
      value: "",
      title: "종료하기",
      publicBookIcon: null,
    },
  ],[]);

  useEffect(() => {
    goal && setClickedGoalColor(goal?.color);
  }, [goal]);

  const onColorClick = (color: GoalColor) => {
    setClickedGoalColor(color);
    onChangeGoalColor(color);
  };

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeGoalName(e.target.value);
  };

  const onPrivacyChange = useCallback((value: GoalData["readPermission"])=>{
    onChangeGoalPrivacy(value)
  },[onChangeGoalPrivacy])

  return (
    <>
      <SubHeadingSpan>제목</SubHeadingSpan>
      <S.GoalTitle
        isUnderline={true}
        type="text"
        color={clickedGoalColor}
        placeholder="나는 리덕스를 정복하겠다!"
        defaultValue={goal?.name}
        onChange={onNameChange}
      ></S.GoalTitle>

      <SubHeadingSpan>공개설정</SubHeadingSpan>
      <ListRadio<GoalData["readPermission"]> name="readPermission" data={publicSettingOptions} value={goalPrivacy} onChange={onPrivacyChange}></ListRadio>

      <SubHeadingSpan>진행 상황</SubHeadingSpan>
      <ListRadio name="running" data={runningOptions} value={"quit"}></ListRadio>

      <SubHeadingSpan>색상</SubHeadingSpan>
      <S.ColorPalette>
        {(Object.keys(T.dark.colors.goals) as GoalColor[]).map((color) => (
          <S.OneColor
            key={color}
            color={color}
            onClick={() => onColorClick(color)}
          ></S.OneColor>
        ))}
      </S.ColorPalette>
    </>
  );
};
