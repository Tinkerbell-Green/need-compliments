import {Menu} from "@styled-icons/feather";
import {Eye} from "@styled-icons/heroicons-outline/Eye";
import type {NextPage} from "next";
import {signIn, useSession} from "next-auth/react";
import React, {useCallback, useState,useEffect} from "react"
import * as S from "./index.styled";
import {Calendar} from "components/calendar"
import {Chip} from "components/chip";
import {LayoutMain} from "components/layout-main"
import {Sidebar} from "components/sidebar";

//TODO: stores/query/types 에 있는 UserData,CategoryData,TaskData 타입참고해서 수정
export type UserInfo = {
  name : string,
  email : string,
  follwer: number,
  follwing : number,
}

const Home: NextPage = () => {
  const {data: session} = useSession();

  useEffect(() => {
    if (!session) {
      signIn();
    }
    if(session) console.log(session.user?.name,session.user?.email);
  }, [session]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name : "HongBeen Lee",
    email : "redbean-2@naver.com",
    follwer: 40,
    follwing :30
  });
  const [goals,setGoals] = useState(["Algorithm","Personal"]);
  const [goalsColor,setGoalsColor] = useState(["orange","blueviolet"]);

  const handleOpenMenu:React.MouseEventHandler = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  },[isMenuOpen]);

  const handleCloseMenu:React.MouseEventHandler = useCallback((event) => {
    if((event.target as HTMLElement).classList.contains("menuClose")){
      setIsMenuOpen(!isMenuOpen);
    }
  },[isMenuOpen]);

  return !session ? null : (
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
        goals={goals}
        goalsColor={goalsColor}
      ></Sidebar>
      <S.Container>
        <S.Profile>
          <S.Name>{userInfo.name}</S.Name>
          <S.SecondaryName>{userInfo.email}</S.SecondaryName>
        </S.Profile>
        <S.Feed>
          <S.Header>Feed</S.Header>
          <S.FeedContents>
            {goals.map((value,index)=>(
              <Chip
                key={index}
                label={value}
                color={goalsColor[index]}
                icon={<Eye/>}
                onAdd={()=>console.log(`${value} clicked`)}
              >
              </Chip>))}
          </S.FeedContents>
        </S.Feed>
      </S.Container>
    </LayoutMain>
  );
};

export default Home;
