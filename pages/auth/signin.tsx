import {InferGetServerSidePropsType} from "next";
import {getProviders, signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import facebookLogo from "../../public/icons/facebook-logo.png";
import googleLogo from "../../public/icons/google-logo.jpeg";
import kakaoLogo from "../../public/icons/kakao-logo.png";
import naverLogo from "../../public/icons/naver-logo.png";
import * as S from "./signin.styled";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {data:session} = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session){
      router.push("/");
    }
  }, [session, router]);

  return (
    <S.Container>
      {providers
        ? Object.values(providers).map((provider) => {
          if (provider.name === "Kakao") {
            return (
              <S.KakaoBtn key={provider.name} onClick={() => signIn(provider.id)}>
                <S.StyledImage width={50} height={50} quality={100} src={kakaoLogo}></S.StyledImage>
                <span>카카오톡으로 계속하기</span>
              </S.KakaoBtn>
            );
          } else if (provider.name === "Naver") {
            return (
              <S.NaverBtn key={provider.name} onClick={() => signIn(provider.id)}>
                <S.StyledImage width={50} height={50} quality={100} src={naverLogo}></S.StyledImage>
                <span>네이버로 계속하기</span>
              </S.NaverBtn>
            );
          } else if (provider.name === "Google") {
            return (
              <S.AppleBtn key={provider.name} onClick={() => signIn(provider.id)}>
                <S.StyledImage width={50} height={50} quality={100} src={googleLogo}></S.StyledImage>
                <span>구글로 계속하기</span>
              </S.AppleBtn>
            );
          }else if (provider.name === "Facebook") {
            return (
              <S.FacebookBtn key={provider.name} onClick={() => signIn(provider.id)}>
                <S.StyledImage width={50} height={50} quality={100} src={facebookLogo}></S.StyledImage>
                <span>페이스북으로 계속하기</span>
              </S.FacebookBtn>
            );
          } else{
            throw new Error(`${provider.name}는 간편로그인 할 수 없는 provider입니다.`);
          }
        })
        : ""}
    </S.Container>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {providers},
  };
}
