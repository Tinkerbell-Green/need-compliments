import { InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import facebookLogo from "../../public/icons/facebook-logo.png";
import googleLogo from "../../public/icons/google-logo.jpeg";
import kakaoLogo from "../../public/icons/kakao-logo.png";
import naverLogo from "../../public/icons/naver-logo.png";
import * as S from "./signin.styled";
import { LayoutCenter } from "components/layout-center";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <LayoutCenter>
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
            } else if (provider.name === "Facebook") {
              return (
                <S.FacebookBtn
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  <Image
                    width={50}
                    height={50}
                    quality={100}
                    src={facebookLogo}
                    alt=""
                  ></Image>
                  <span>페이스북으로 계속하기</span>
                </S.FacebookBtn>
              );
            } else {
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
    props: { providers },
  };
}
