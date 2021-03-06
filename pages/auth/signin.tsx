import {InferGetServerSidePropsType} from "next";
import {getProviders, signIn, useSession} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect} from "react";
import googleLogo from "../../public/icons/google-logo.jpeg";
import kakaoLogo from "../../public/icons/kakao-logo.png";
import naverLogo from "../../public/icons/naver-logo.png";
import {Seo} from "components/atoms/seo";
import {LayoutCenter} from "components/templates/layout-center";
import * as S from "styles/pages/signin.styled";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);
   
  return (
    <LayoutCenter>
      <Seo title={"로그인"}></Seo>
      {providers
        ? Object.values(providers).map((provider) => {
          if (provider.name === "Kakao") {
            return (
              <S.KakaoBtn
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                <Image
                  width={50}
                  height={50}
                  quality={100}
                  src={kakaoLogo}
                  alt=""
                ></Image>
                <span>카카오톡으로 계속하기</span>
              </S.KakaoBtn>
            );
          } else if (provider.name === "Naver") {
            return (
              <S.NaverBtn
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                <Image
                  width={50}
                  height={50}
                  quality={100}
                  src={naverLogo}
                  alt=""
                ></Image>
                <span>네이버로 계속하기</span>
              </S.NaverBtn>
            );
          } else if (provider.name === "Google") {
            return (
              <S.GoogleBtn
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                <Image
                  width={50}
                  height={50}
                  quality={100}
                  src={googleLogo}
                  alt=""
                ></Image>
                <span>구글로 계속하기</span>
              </S.GoogleBtn>
            );
          }else {
            console.error(
              `${provider.name}는 간편로그인 할 수 없는 provider입니다.`
            );
          }
        })
        : ""}
    </LayoutCenter>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {providers},
  };
}