import {Menu, BookOpen,PlusCircle} from "@styled-icons/feather";
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

  const handleHiddenMenu:React.MouseEventHandler = useCallback((event) => {
    if (event.target !== event.currentTarget) return;
    setIsMenuOpen(!isMenuOpen);
  },[isMenuOpen]);

  return (
    <LayoutMain>
      <S.IconList>
        <S.IconPointer>
          <Menu onClick={handleHiddenMenu} size={28}/>
        </S.IconPointer>
      </S.IconList>
      <Calendar></Calendar>
      <Sidebar
        name={userInfo.name} 
        email={userInfo.email} 
        follwer={userInfo.follwer} 
        follwing={userInfo.follwing}
        isMenuOpen={isMenuOpen}
        onMenuClick={handleHiddenMenu}
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
            <ListItemGoal key={index} textColor={"violet"}>
              <S.Icon><BookOpen size={18}/></S.Icon>
              {value}
              <S.IconPointer><PlusCircle size={18}/></S.IconPointer>
            </ListItemGoal>))}
        </S.Feed>
      </S.Container>
    </LayoutMain>
  );
};

export default Home;
