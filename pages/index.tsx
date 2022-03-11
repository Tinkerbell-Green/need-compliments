import {Menu} from "@styled-icons/feather";
import type {NextPage} from "next";
import React, {useCallback, useState, useEffect} from "react";
import * as S from "./index.styled";
import {Calendar} from "components/calendar";
import {Feed} from "components/feed";
import {LayoutMain} from "components/layout-main";
import {Sidebar} from "components/sidebar";
import {
  useDataSaga,
  DataActionType,
  UserData,
  GoalData,
  TaskData,
} from "stores/data";

//TODO: stores/query/types 에 있는 UserData,GoalsData,TaskData 타입참고해서 수정
export type ExpandedUserData = Pick<UserData, "name" | "email"> & {
	follwersCount: number;
	follwingsCount: number;
};

export type ExpandedGoalData = Pick<GoalData,"id"|"name"|"color">;

const Home: NextPage = () => {
  const {data: loggedInUserData} =
		useDataSaga<DataActionType.GET_LOGGED_IN_USER_DATA>(
		  DataActionType.GET_LOGGED_IN_USER_DATA
		);
  const {fetch: getGoalsFetch, data: getGoalsData, refetch: getGoalsRefetch} = useDataSaga<DataActionType.GET_GOALS>(DataActionType.GET_GOALS);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [follwersCount, setFollwersCount] = useState(0);
  const [follwingsCount, setFollwingsCount] = useState(0);
  const [goals,setGoals]= useState<ExpandedGoalData[]>([{id:`${Date.toString}`, name:"Algorithms",color:"orange"}]);

  useEffect(() => {
    if (loggedInUserData) {
      setName(loggedInUserData.name);
      setEmail(loggedInUserData.email);
      setFollwersCount(loggedInUserData.followers.length);
      setFollwingsCount(loggedInUserData.followings.length);
    }
  }, [loggedInUserData]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu: React.MouseEventHandler = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleCloseMenu: React.MouseEventHandler = useCallback(
    (event) => {
      if ((event.target as HTMLElement).classList.contains("menuClose")) {
        setIsMenuOpen(!isMenuOpen);
      }
    },
    [isMenuOpen]
  );

  return (
    <LayoutMain>
      <S.IconList>
        <S.MenuIcon onClick={handleOpenMenu}>
          <Menu />
        </S.MenuIcon>
      </S.IconList>
      <div className="visible">
        <Calendar></Calendar>
        <S.DetailSection>
          <S.Profile>
            <S.Name>{name}</S.Name>
            <S.SecondaryName>{email}</S.SecondaryName>
          </S.Profile>
          <Feed goals={goals}></Feed>
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
