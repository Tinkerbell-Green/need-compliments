import {Menu} from "@styled-icons/feather";
import type {NextPage} from "next";
import React, {useState} from "react"
import * as S from "./index.styled";
import {Calendar} from "components/calendar"
import {LayoutMain} from "components/layout-main"
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

  const handleHiddenMenu:React.MouseEventHandler = (event) => {
    if (event.target !== event.currentTarget) return;
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <LayoutMain>
      <S.IconList>
        <S.MenuIcon>
          <Menu onClick={handleHiddenMenu} />
        </S.MenuIcon>
      </S.IconList>
      <Calendar></Calendar>
      <Sidebar
        name={userInfo.name} 
        email={userInfo.email} 
        follwer={userInfo.follwer} 
        follwing={userInfo.follwing}
        isMenuOpen={isMenuOpen}
        onMenuClick={handleHiddenMenu}
        goalList={goalList}
      ></Sidebar>
    </LayoutMain>
    
  )
}

export default Home