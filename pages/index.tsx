import {Menu} from "@styled-icons/feather";
import type {NextPage} from "next";
import React, {useCallback, useState, useEffect} from "react";
import * as S from "./index.styled";
import {Calendar} from "components/calendar"
import {Feed} from "components/organisms/feed";
import {Sidebar} from "components/sidebar";
import {LayoutMain} from "components/templates/layout-main"
import {useDataSaga, DataActionType, UserData, GoalData} from "stores/data";
import {Dayjs} from "utils/dayjs";

export type ExpandedUserData = Pick<UserData, "name" | "email"> & {
	follwersCount: number;
	follwingsCount: number;
};
export type ReducedGoalData = Pick<GoalData,"id"|"name"|"color">;

const Home: NextPage = () => {
  const {
    data: loggedInUserData
  } = useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(DataActionType.GET_LOGGED_IN_USER_DATA);

  const {
    fetch: getGoalsFetch, 
    data: getGoalsData,
  } = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);

  const [pickedDate,setPickedDate]=useState(Dayjs().format("DDMMYYYY"))
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [follwersCount, setFollwersCount] = useState(0);
  const [follwingsCount, setFollwingsCount] = useState(0);
  const [goals,setGoals]= useState<ReducedGoalData[]>([]);

  useEffect(() => {
    if (loggedInUserData) {
      setName(loggedInUserData.name);
      setEmail(loggedInUserData.email);
      setFollwersCount(loggedInUserData.followers.length);
      setFollwingsCount(loggedInUserData.followings.length);
    }
  }, [loggedInUserData]);
  
  useEffect(()=>{
    getGoalsFetch({})
  },[getGoalsFetch])

  useEffect(()=>{
    getGoalsData && setGoals(getGoalsData.map(({id,name,color})=>({id, name, color})));
  },[getGoalsData]);

  const handleOpenMenu: React.MouseEventHandler = useCallback(() => {
    setIsMenuOpen(true);
  },[]);

  const handleCloseMenu: React.MouseEventHandler = useCallback((event) => {
    if ((event.target as HTMLElement).classList.contains("menuClose")) {
      setIsMenuOpen(false);
    }
  },[]);

  const handleDateClick = useCallback((date:string)=>{
    setPickedDate(date);
  },[])

  return (
    <LayoutMain>
      <S.IconList>
        <S.MenuIcon onClick={handleOpenMenu}>
          <Menu />
        </S.MenuIcon>
      </S.IconList>
      <div className="visible">
        <Calendar
          onDateClick={handleDateClick}></Calendar>
        <S.DetailSection>
          <S.Profile>
            <S.Name>{name}</S.Name>
            <S.SecondaryName>{email}</S.SecondaryName>
          </S.Profile>
          <Feed 
            pickedDate={pickedDate}
            goals={goals}></Feed>
        </S.DetailSection>
      </div>
      <div className="invisible">
        <Sidebar
          name={name}
          email={email}
          follwersCount={follwersCount}
          follwingsCount={follwingsCount}
          isMenuOpen={isMenuOpen}
          onCloseMenu={handleCloseMenu}
          goals={goals}
        ></Sidebar>
      </div>
    </LayoutMain>
  );
};

export default Home;
