import type {NextPage} from "next";
import {signIn} from "next-auth/react";
import {NextAuth} from "components/next-auth/";

const Home: NextPage = () => {
  // 로그인하는 페이지 보여주기
  // "/auth/signin"로 이동
  signIn();

  return <></>;
};

export default Home;
