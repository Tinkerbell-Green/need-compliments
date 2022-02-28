import {InferGetServerSidePropsType} from "next";
import {getProviders, signIn} from "next-auth/react";
import naverLogo from "../../public/icons/naver-logo.png";
import * as S from "./signin.styled";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <S.Container>
      {providers
        ? Object.values(providers).map((provider) => {
          if (provider.name === "Naver") {
            return (
              <S.NaverBtn key={provider.name} onClick={() => signIn(provider.id)}>
                <S.StyledImage width={50} height={50} quality={100} src={naverLogo}></S.StyledImage>
                <span>네이버로 계속하기</span>
              </S.NaverBtn>
            );
          } else if (provider.name === "Kakao") {
            return (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                    카카오톡으로 계속하기
                </button>
              </div>
            );
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
