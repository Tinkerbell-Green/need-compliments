import {Book as BookOpen, BookHalf} from "@styled-icons/bootstrap";
import {Book as BookClose, BookDead} from "@styled-icons/fa-solid";
import React,{useEffect, useMemo,ReactNode} from "react";
import * as S from "./feedPersonal.styled";
import {TaskData, GoalData} from "api"
import {Chip} from "components/atoms/chip";
import {Icon} from "components/atoms/icon"
import {TaskInput} from "components/moleculs/taskInput"
import {Dayjs} from "utils/dayjs";
import {useSnackbarifyState} from "utils/snackbarify"

type FeedPersonalProps = {
  pickedDate:string,
  goalTasks: Record<string, TaskData[]>,
	goals: GoalData[],
  onTaskDelete: (id:string)=>void,
  onTaskCreate: (id:string, readPermission: GoalData["readPermission"])=>void,
  onTaskUpdate:(id:string, text:string)=>void,
};

const ICON_MAP:Record<GoalData["readPermission"], ReactNode> = {
  "everyone": <BookOpen/>,
  "me": <BookClose/>,
  "none":<BookDead/>
}

export const FeedPersonal = ({
  pickedDate,
  goalTasks,
  goals,
  onTaskDelete,
  onTaskCreate,
  onTaskUpdate
}: FeedPersonalProps) => {
  const {setSnackbarProps,setIsSnackbarVisible,setSnackbarDuration} = useSnackbarifyState();
  const isAddable = useMemo(()=>Dayjs(pickedDate,"DDMMYYYY").toNow().match(/전/g),[pickedDate]);

  useEffect(() => {
    if(!isAddable) return;

    setSnackbarProps({message: "미래에 할 일 대신, 한 일을 기록해보세요!"});
    setIsSnackbarVisible(true);
    setSnackbarDuration(3500)
  }, [setIsSnackbarVisible,setSnackbarProps,setSnackbarDuration,isAddable]);

  return (
    <S.Feed>
      <S.Header>
        <S.PickedDate>{`${pickedDate.substring(4)}년 ${pickedDate.substring(2,4)}월 ${pickedDate.substring(0,2)}일`}</S.PickedDate>
      </S.Header>
      <S.FeedContents>
        {isAddable
          ? goals.map((goal) => (
            <S.GoalAndInput key={goal._id}>
              <Chip
                label={goal.name}
                color={goal.color}
                icon={<Icon size={18} color="gray" aria-label={"personal image"}>{ICON_MAP[goal.readPermission] || <BookDead/>}</Icon>}
              ></Chip>
            </S.GoalAndInput>))
          : goals.map((goal) => (
            <S.GoalAndInput key={goal._id}>
              <Chip
                label={goal.name}
                color={goal.color}
                icon={<Icon size={18}  color="gray" aria-label={"personal image"}>{ICON_MAP[goal.readPermission] || <BookDead/>}</Icon>}
                onAdd={()=>onTaskCreate(goal.id, goal.readPermission)}
              ></Chip>
              <ul>
                {goalTasks[goal._id].map(({_id,title})=>(
                  <TaskInput 
                    key={_id} 
                    id={_id} 
                    color={goal.color} 
                    title={title} 
                    onTaskDelete={onTaskDelete}
                    onTaskUpdate={onTaskUpdate}></TaskInput>
                ))}
              </ul>
            </S.GoalAndInput>
          ))}
      </S.FeedContents>
    </S.Feed>
  );
};
