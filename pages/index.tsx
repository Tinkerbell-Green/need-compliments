import {Menu} from "@styled-icons/feather";
import type {NextPage} from "next";
import React, {useCallback, useState} from "react"
import * as S from "./index.styled";
import {Calendar} from "components/calendar"
import {LayoutMain} from "components/layout-main"
import {Sidebar} from "components/sidebar";

//TODO: stores/query/types 에 있는 UserData 타입으로 수정
// (followers 는 해당 유저를 팔로우하는 사용자 아이디의 배열)
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
        goalList={goalList}
      ></Sidebar>
    </LayoutMain>
  );
};

export default Home;
