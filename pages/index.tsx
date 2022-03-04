import {Menu, BookOpen,PlusCircle} from "@styled-icons/feather";
//TODO: icon별로 출처와 이미지 노션에 공유하기. 겹치는거는 통일하고, 더 적절한거 상의.
import type {NextPage} from "next";
import React, {useCallback, useState} from "react"
import * as S from "./index.styled";
import {Calendar} from "components/calendar"
import {LayoutMain} from "components/layout-main"
import {ListItemGoal} from "components/list-item-goal";
import {Sidebar} from "components/sidebar";

export type UserInfo = {
  name : string,
  email : string,
  follwer: number,
  follwing : number,
}

const Home: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name : "HongBeen Lee",
    email : "redbean-2@naver.com",
    follwer: 40,
    follwing :30
  });
  const [goalList,setGoalList] = useState(["Algorithm","Personal"]);

  const handleOpenMenu:React.MouseEventHandler = useCallback((event) => {
    setIsMenuOpen(!isMenuOpen);
  },[isMenuOpen]);

  const handleCloseMenu:React.MouseEventHandler = useCallback((event) => {
    if((event.target as HTMLElement).classList.contains("menuClose")){
      setIsMenuOpen(!isMenuOpen);
    }
  },[isMenuOpen]);

  return (
    <LayoutMain>
      <S.IconList>
        <S.MenuIcon onClick={handleOpenMenu}>
          <Menu />
        </S.MenuIcon>
      </S.IconList>
      <Calendar></Calendar>
      <Sidebar
        name={userInfo.name} 
        email={userInfo.email} 
        follwer={userInfo.follwer} 
        follwing={userInfo.follwing}
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
        goalList={goalList} //TODO: 객체를 전달하는 방식말고.. 일반화한 gray-box컴포넌트를 여기서 만들어서 children으로 전달?
      ></Sidebar>
      <S.Container>
        <S.Profile>
          <S.Name>{userInfo.name}</S.Name>
          <S.SubName>{userInfo.email}</S.SubName>
        </S.Profile>
        <S.Feed>
          <span>Feed</span>
          {goalList.map((value,index)=>(
            <ListItemGoal 
              key={index}
              color="orange"
              leftComponent={<S.PublicScopeIcon><BookOpen/></S.PublicScopeIcon>}
              rightComponent={<S.AddIcon><PlusCircle/></S.AddIcon>}
            >
              {value}
            </ListItemGoal>))}
        </S.Feed>
      </S.Container>
    </LayoutMain>
  );
};

export default Home;
